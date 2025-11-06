import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import Papa from 'papaparse';

interface CandidateData {
  id: string;
  jurisdiction: string;
  ballotTitle: string;
  name: string;
  party: string;
  email: string;
  phone: string;
  website: string;
  electedExperience: string;
  professionalExperience: string;
  education: string;
  communityService: string;
  statement: string;
}

const CompareCandidates: React.FC = () => {
  const { t } = useTranslation();
  const { userAddress, setUserAddress } = useApp();
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('all');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [addressInput, setAddressInput] = useState(() => {
    // Load saved address from localStorage
    if (userAddress) {
      return `${userAddress.street}, ${userAddress.city}, ${userAddress.state} ${userAddress.zipCode}`;
    }
    return '';
  });
  const [lookingUpDistricts, setLookingUpDistricts] = useState(false);
  const comparisonRef = React.useRef<HTMLDivElement>(null);

  const handleCompare = () => {
    if (comparisonRef.current) {
      comparisonRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Update address input when userAddress changes
  useEffect(() => {
    if (userAddress) {
      setAddressInput(`${userAddress.street}, ${userAddress.city}, ${userAddress.state} ${userAddress.zipCode}`);
    }
  }, [userAddress]);

  useEffect(() => {
    // Load and parse CSV file
    fetch('/data/king_county_candidates_2025_final.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedCandidates: CandidateData[] = results.data.map((row: any, index: number) => ({
              id: `candidate-${index}`,
              jurisdiction: row['Jurisdiction Name'] || '',
              ballotTitle: row['Ballot Title'] || '',
              name: row['Ballot Name'] || '',
              party: row['PartyName'] || '',
              email: row['Campaign Email'] || '',
              phone: row['CampaignPhone'] || '',
              website: row['Campaign Website'] || '',
              electedExperience: row['Pamphlet_Elected_Experience'] || '',
              professionalExperience: row['Pamphlet_Professional_Experience'] || '',
              education: row['Pamphlet_Education'] || '',
              communityService: row['Pamphlet_Community_Service'] || '',
              statement: row['Pamphlet_Statement'] || '',
            }));
            setCandidates(parsedCandidates);
            setLoading(false);
          },
        });
      })
      .catch(error => {
        console.error('Error loading candidates:', error);
        setLoading(false);
      });
  }, []);

  // Function to lookup districts using King County API
  const lookupDistrictsWithKingCounty = async (address: string) => {
    try {
      const geocodeUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${encodeURIComponent(address)}&countryCode=USA&f=json&outFields=*`;

      const geocodeResponse = await fetch(geocodeUrl);
      const geocodeData = await geocodeResponse.json();

      if (!geocodeData.candidates || geocodeData.candidates.length === 0) {
        return null;
      }

      const location = geocodeData.candidates[0].location;
      const { x, y } = location;

      const queryParams = `geometry=${x},${y}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=false&f=json`;
      const baseUrl = 'https://gismaps.kingcounty.gov/arcgis/rest/services/Districts/DistrictsReport/MapServer';

      const ldUrl = `${baseUrl}/12/query?${queryParams}`;
      const cdUrl = `${baseUrl}/11/query?${queryParams}`;
      const ccUrl = `${baseUrl}/9/query?${queryParams}`;
      const sdUrl = `${baseUrl}/14/query?${queryParams}`;

      const [ldResponse, cdResponse, ccResponse, sdResponse] = await Promise.all([
        fetch(ldUrl),
        fetch(cdUrl),
        fetch(ccUrl),
        fetch(sdUrl)
      ]);

      const [ldData, cdData, ccData, sdData] = await Promise.all([
        ldResponse.json(),
        cdResponse.json(),
        ccResponse.json(),
        sdResponse.json()
      ]);

      const districtInfo: any = {
        legislative: 'Unknown',
        congressional: 'Unknown',
        countyCouncil: 'Unknown',
        school: 'Unknown',
      };

      if (ldData.features && ldData.features.length > 0) {
        districtInfo.legislative = ldData.features[0].attributes.LEGDST || 'Unknown';
      }

      if (cdData.features && cdData.features.length > 0) {
        districtInfo.congressional = cdData.features[0].attributes.CONGDST || 'Unknown';
      }

      if (ccData.features && ccData.features.length > 0) {
        districtInfo.countyCouncil = ccData.features[0].attributes.kccdst || 'Unknown';
      }

      if (sdData.features && sdData.features.length > 0) {
        districtInfo.school = sdData.features[0].attributes.NAME || 'Unknown';
      }

      return districtInfo;
    } catch (error) {
      console.error('Error looking up districts:', error);
      return null;
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookingUpDistricts(true);

    const districtInfo = await lookupDistrictsWithKingCounty(addressInput);

    if (districtInfo) {
      // Parse the address to extract components
      const addressParts = addressInput.split(',').map(s => s.trim());
      const street = addressParts[0] || '';
      const city = addressParts[1] || 'Seattle';
      const stateZip = addressParts[2] || 'WA';
      const zipMatch = stateZip.match(/\d{5}/);
      const zipCode = zipMatch ? zipMatch[0] : '';

      const newAddress = {
        street: street,
        city: city,
        zipCode: zipCode,
        state: 'WA',
        legislativeDistrict: districtInfo.legislative,
        congressionalDistrict: districtInfo.congressional,
        countyCouncilDistrict: districtInfo.countyCouncil,
        schoolDistrict: districtInfo.school,
      };
      setUserAddress(newAddress);
    } else {
      alert('Could not find districts for this address. Please check your address and try again.');
    }

    setLookingUpDistricts(false);
  };

  // Auto-select jurisdiction based on user address
  useEffect(() => {
    if (userAddress && candidates.length > 0) {
      // Match user's legislative district with jurisdictions in CSV
      if (userAddress.legislativeDistrict) {
        const ldJurisdiction = `Legislative District ${userAddress.legislativeDistrict}`;
        const matchingJurisdiction = candidates.find(c => c.jurisdiction === ldJurisdiction);
        if (matchingJurisdiction) {
          setSelectedJurisdiction(ldJurisdiction);
          return;
        }
      }

      // Match congressional district
      if (userAddress.congressionalDistrict) {
        const cdJurisdiction = `Congressional District ${userAddress.congressionalDistrict}`;
        const matchingJurisdiction = candidates.find(c => c.jurisdiction === cdJurisdiction);
        if (matchingJurisdiction) {
          setSelectedJurisdiction(cdJurisdiction);
          return;
        }
      }

      // Match county council district
      if (userAddress.countyCouncilDistrict) {
        const ccJurisdiction = `King County Council District ${userAddress.countyCouncilDistrict}`;
        const matchingJurisdiction = candidates.find(c => c.jurisdiction === ccJurisdiction);
        if (matchingJurisdiction) {
          setSelectedJurisdiction(ccJurisdiction);
        }
      }
    }
  }, [userAddress, candidates]);

  const jurisdictions = useMemo(() => {
    const uniqueJurisdictions = new Set(candidates.map(c => c.jurisdiction));
    const allJurisdictions = Array.from(uniqueJurisdictions).sort();

    // If user has address, show relevant jurisdictions
    if (userAddress) {
      const filteredJurisdictions = allJurisdictions.filter(jurisdiction => {
        // State Level: Legislative District
        if (userAddress.legislativeDistrict &&
            jurisdiction === `Legislative District ${userAddress.legislativeDistrict}`) {
          return true;
        }

        // State Level: Congressional District
        if (userAddress.congressionalDistrict &&
            jurisdiction === `Congressional District ${userAddress.congressionalDistrict}`) {
          return true;
        }

        // County Level: King County
        if (jurisdiction === 'King County') {
          return true;
        }

        // County Level: King County Council District
        if (userAddress.countyCouncilDistrict &&
            jurisdiction === `King County Council District ${userAddress.countyCouncilDistrict}`) {
          return true;
        }

        // Port of Seattle (all King County residents)
        if (jurisdiction === 'Port of Seattle') {
          return true;
        }

        // City Level
        if (userAddress.city) {
          // City of [Name]
          if (jurisdiction === `City of ${userAddress.city}`) {
            return true;
          }
          // Town of [Name]
          if (jurisdiction === `Town of ${userAddress.city}`) {
            return true;
          }
        }

        // School District
        if (userAddress.schoolDistrict) {
          if (jurisdiction.includes(userAddress.schoolDistrict)) {
            return true;
          }
        }

        // Other local districts (Fire, Water, Sewer, etc.) that may include city name
        if (userAddress.city) {
          const cityLower = userAddress.city.toLowerCase();
          const jurisdictionLower = jurisdiction.toLowerCase();

          if (jurisdictionLower.includes(cityLower) ||
              jurisdictionLower.includes(cityLower.replace(' ', ''))) {
            return true;
          }
        }

        return false;
      });

      if (filteredJurisdictions.length > 0) {
        return ['all', ...filteredJurisdictions];
      }
    }

    return ['all', ...allJurisdictions];
  }, [candidates, userAddress]);

  const filteredCandidates = useMemo(() => {
    if (selectedJurisdiction === 'all') {
      // If user has address, show only candidates from their districts
      if (userAddress) {
        return candidates.filter(candidate => {
          const jurisdiction = candidate.jurisdiction;

          // State Level: Legislative District
          if (userAddress.legislativeDistrict &&
              jurisdiction === `Legislative District ${userAddress.legislativeDistrict}`) {
            return true;
          }

          // State Level: Congressional District
          if (userAddress.congressionalDistrict &&
              jurisdiction === `Congressional District ${userAddress.congressionalDistrict}`) {
            return true;
          }

          // County Level: King County
          if (jurisdiction === 'King County') {
            return true;
          }

          // County Level: King County Council District
          if (userAddress.countyCouncilDistrict &&
              jurisdiction === `King County Council District ${userAddress.countyCouncilDistrict}`) {
            return true;
          }

          // Port of Seattle (all King County residents)
          if (jurisdiction === 'Port of Seattle') {
            return true;
          }

          // City Level
          if (userAddress.city) {
            // City of [Name]
            if (jurisdiction === `City of ${userAddress.city}`) {
              return true;
            }
            // Town of [Name]
            if (jurisdiction === `Town of ${userAddress.city}`) {
              return true;
            }
          }

          // School District
          if (userAddress.schoolDistrict) {
            if (jurisdiction.includes(userAddress.schoolDistrict)) {
              return true;
            }
          }

          // Other local districts (Fire, Water, Sewer, etc.) that may include city name
          if (userAddress.city) {
            const cityLower = userAddress.city.toLowerCase();
            const jurisdictionLower = jurisdiction.toLowerCase();

            if (jurisdictionLower.includes(cityLower) ||
                jurisdictionLower.includes(cityLower.replace(' ', ''))) {
              return true;
            }
          }

          return false;
        });
      }
      return candidates;
    }
    return candidates.filter((c) => c.jurisdiction === selectedJurisdiction);
  }, [selectedJurisdiction, candidates, userAddress]);

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates((prev) => {
      if (prev.includes(candidateId)) {
        return prev.filter((id) => id !== candidateId);
      } else if (prev.length < 3) {
        return [...prev, candidateId];
      }
      return prev;
    });
  };

  const candidatesToCompare = useMemo(() => {
    return candidates.filter((c) => selectedCandidates.includes(c.id));
  }, [selectedCandidates, candidates]);

  const categories = [
    { key: 'electedExperience', label: t('compareCandidates.electedExperience') },
    { key: 'professionalExperience', label: t('compareCandidates.professionalExperience') },
    { key: 'education', label: t('compareCandidates.education') },
    { key: 'communityService', label: t('compareCandidates.communityService') },
    { key: 'statement', label: t('compareCandidates.statement') },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">{t('compareCandidates.loadingCandidates')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('nav.compareCandidates')}</h1>
      <p className="text-gray-600 mb-8">
        {t('compareCandidates.subtitle')}
      </p>

      {/* Address Input Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('compareCandidates.enterAddressTitle')}</h2>
        <form onSubmit={handleAddressSubmit}>
          <div className="flex gap-3">
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder={t('compareCandidates.addressPlaceholder')}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
            <button
              type="submit"
              disabled={lookingUpDistricts}
              className="px-8 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {lookingUpDistricts ? t('compareCandidates.lookingUp') : t('compareCandidates.findMyDistricts')}
            </button>
          </div>
        </form>
      </div>

      {/* User Address Info */}
      {userAddress && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-green-800 mb-3">{t('compareCandidates.yourDistricts')}</h3>
          <p className="text-green-800 mb-2">
            <span className="font-medium">{t('compareCandidates.address')}:</span> {userAddress.street}, {userAddress.city}, {userAddress.state} {userAddress.zipCode}
          </p>
          <div className="text-green-700 space-y-1">
            {userAddress.legislativeDistrict && (
              <p><span className="font-medium">{t('compareCandidates.legislativeDistrict')}:</span> {userAddress.legislativeDistrict}</p>
            )}
            {userAddress.congressionalDistrict && (
              <p><span className="font-medium">{t('compareCandidates.congressionalDistrict')}:</span> {userAddress.congressionalDistrict}</p>
            )}
            {userAddress.countyCouncilDistrict && (
              <p><span className="font-medium">{t('compareCandidates.countyCouncilDistrict')}:</span> {userAddress.countyCouncilDistrict}</p>
            )}
            {userAddress.schoolDistrict && (
              <p><span className="font-medium">{t('compareCandidates.schoolDistrict')}:</span> {userAddress.schoolDistrict}</p>
            )}
          </div>
          <p className="text-green-700 text-sm mt-3 font-medium">
            {t('compareCandidates.showingCandidates')}
          </p>
        </div>
      )}

      {/* Jurisdiction Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('compareCandidates.selectJurisdiction')}</h2>
        <select
          value={selectedJurisdiction}
          onChange={(e) => {
            setSelectedJurisdiction(e.target.value);
            setSelectedCandidates([]);
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 hover:bg-white"
        >
          {jurisdictions.map((jurisdiction) => (
            <option key={jurisdiction} value={jurisdiction}>
              {jurisdiction === 'all' ? t('compareCandidates.allJurisdictions') : jurisdiction}
            </option>
          ))}
        </select>
      </div>

      {/* Candidate Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {t('compareCandidates.selectCandidatesTitle')}
          </h2>
          {selectedCandidates.length >= 2 && (
            <button
              onClick={handleCompare}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-semibold"
            >
              {t('compareCandidates.compare')} ({selectedCandidates.length})
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedCandidates.includes(candidate.id)
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
              onClick={() => toggleCandidateSelection(candidate.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 pr-2">
                  <h3 className="font-bold text-lg text-gray-800">{candidate.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{candidate.ballotTitle}</p>
                </div>
                <div
                  className={`flex-shrink-0 w-6 h-6 border-2 rounded ${
                    selectedCandidates.includes(candidate.id)
                      ? 'bg-primary-600 border-primary-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedCandidates.includes(candidate.id) && (
                    <svg
                      className="w-full h-full text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-sm text-primary-600 font-medium mb-2">{candidate.party}</p>
              <p className="text-sm text-gray-600">{candidate.jurisdiction}</p>
            </div>
          ))}
        </div>
        {filteredCandidates.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            {t('compareCandidates.noCandidates')}
          </p>
        )}
      </div>

      {/* Comparison Table */}
      {candidatesToCompare.length > 0 && (
        <div ref={comparisonRef} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('compareCandidates.candidateComparison')}</h2>

          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 bg-gray-50 font-bold text-gray-700 w-48">
                    {t('compareCandidates.category')}
                  </th>
                  {candidatesToCompare.map((candidate) => (
                    <th
                      key={candidate.id}
                      className="p-4 bg-gray-50 text-left font-bold text-gray-700"
                    >
                      <div>{candidate.name}</div>
                      <div className="text-sm font-normal text-primary-600">
                        {candidate.party}
                      </div>
                      <div className="text-sm font-normal text-gray-600">
                        {candidate.ballotTitle}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.key} className="border-b border-gray-200">
                    <td className="p-4 font-semibold text-gray-700 bg-gray-50 align-top">
                      {category.label}
                    </td>
                    {candidatesToCompare.map((candidate) => {
                      const value = candidate[category.key as keyof CandidateData];
                      return (
                        <td key={candidate.id} className="p-4 align-top">
                          {value ? (
                            <div className="text-sm text-gray-700 whitespace-pre-wrap">
                              {value}
                            </div>
                          ) : (
                            <p className="text-gray-400 italic text-sm">{t('compareCandidates.noInfo')}</p>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-700 bg-gray-50 align-top">{t('compareCandidates.contact')}</td>
                  {candidatesToCompare.map((candidate) => (
                    <td key={candidate.id} className="p-4 align-top">
                      <div className="space-y-1 text-sm">
                        {candidate.website && (
                          <div>
                            <a
                              href={candidate.website.startsWith('http') ? candidate.website : `https://${candidate.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:underline break-words"
                            >
                              {candidate.website}
                            </a>
                          </div>
                        )}
                        {candidate.email && <div className="text-gray-700">{candidate.email}</div>}
                        {candidate.phone && <div className="text-gray-700">{candidate.phone}</div>}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-6">
            {candidatesToCompare.map((candidate) => (
              <div key={candidate.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{candidate.name}</h3>
                <p className="text-primary-600 font-medium mb-1">{candidate.party}</p>
                <p className="text-gray-600 text-sm mb-4">{candidate.ballotTitle}</p>
                <div className="space-y-4">
                  {categories.map((category) => {
                    const value = candidate[category.key as keyof CandidateData];
                    if (!value) return null;
                    return (
                      <div key={category.key}>
                        <h4 className="font-semibold text-gray-700 mb-1">{category.label}</h4>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{value}</p>
                      </div>
                    );
                  })}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">{t('compareCandidates.contact')}</h4>
                    <div className="space-y-1 text-sm">
                      {candidate.website && (
                        <div>
                          <a
                            href={candidate.website.startsWith('http') ? candidate.website : `https://${candidate.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline break-words"
                          >
                            {candidate.website}
                          </a>
                        </div>
                      )}
                      {candidate.email && <div className="text-gray-700">{candidate.email}</div>}
                      {candidate.phone && <div className="text-gray-700">{candidate.phone}</div>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareCandidates;
