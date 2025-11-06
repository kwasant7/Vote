import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { elections } from '../data/elections';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { selectedElection, setSelectedElection, userAddress, setUserAddress } = useApp();
  const [daysUntilElection, setDaysUntilElection] = useState<number>(0);
  const [addressForm, setAddressForm] = useState({
    street: userAddress?.street || '',
    city: userAddress?.city || 'Seattle',
    zipCode: userAddress?.zipCode || '',
  });
  const [fullAddress, setFullAddress] = useState(
    userAddress
      ? `${userAddress.street}, ${userAddress.city}, WA ${userAddress.zipCode}`
      : ''
  );
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(() => {
    // Load checked items from localStorage
    const saved = localStorage.getItem('voterChecklist');
    return saved ? JSON.parse(saved) : {};
  });

  const nextElection = elections.find((e) => e.type === 'future') || elections[0];

  useEffect(() => {
    if (!selectedElection && nextElection) {
      setSelectedElection(nextElection);
    }
  }, [selectedElection, nextElection, setSelectedElection]);

  useEffect(() => {
    if (selectedElection) {
      const electionDate = new Date(selectedElection.date);
      const today = new Date();
      const diffTime = electionDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilElection(diffDays);
    }
  }, [selectedElection]);

  // Function to lookup districts - uses King County official district finder link
  const lookupDistrictsByZip = (zipCode: string) => {
    // Comprehensive King County zip code to district mapping
    const districtMap: Record<string, any> = {
      // Seattle zipcodes
      '98101': { legislative: '43', school: 'Seattle Public Schools', countyCouncil: '7', congressional: '7' },
      '98102': { legislative: '43', school: 'Seattle Public Schools', countyCouncil: '3', congressional: '7' },
      '98103': { legislative: '46', school: 'Seattle Public Schools', countyCouncil: '4', congressional: '7' },
      '98104': { legislative: '37', school: 'Seattle Public Schools', countyCouncil: '7', congressional: '7' },
      '98105': { legislative: '46', school: 'Seattle Public Schools', countyCouncil: '4', congressional: '7' },
      '98106': { legislative: '34', school: 'Seattle Public Schools', countyCouncil: '8', congressional: '7' },
      '98107': { legislative: '36', school: 'Seattle Public Schools', countyCouncil: '6', congressional: '7' },
      '98108': { legislative: '11', school: 'Tukwila School District', countyCouncil: '5', congressional: '7' },
      '98109': { legislative: '43', school: 'Seattle Public Schools', countyCouncil: '1', congressional: '7' },
      '98112': { legislative: '43', school: 'Seattle Public Schools', countyCouncil: '3', congressional: '7' },
      '98115': { legislative: '46', school: 'Seattle Public Schools', countyCouncil: '4', congressional: '7' },
      '98116': { legislative: '34', school: 'Seattle Public Schools', countyCouncil: '1', congressional: '7' },
      '98117': { legislative: '36', school: 'Seattle Public Schools', countyCouncil: '6', congressional: '7' },
      '98118': { legislative: '37', school: 'Seattle Public Schools', countyCouncil: '2', congressional: '7' },
      '98119': { legislative: '43', school: 'Seattle Public Schools', countyCouncil: '1', congressional: '7' },
      '98121': { legislative: '43', school: 'Seattle Public Schools', countyCouncil: '7', congressional: '7' },
      '98122': { legislative: '37', school: 'Seattle Public Schools', countyCouncil: '3', congressional: '7' },
      '98125': { legislative: '32', school: 'Seattle Public Schools', countyCouncil: '5', congressional: '7' },
      '98126': { legislative: '34', school: 'Seattle Public Schools', countyCouncil: '1', congressional: '7' },
      '98133': { legislative: '32', school: 'Shoreline Public Schools', countyCouncil: '5', congressional: '7' },
      '98134': { legislative: '37', school: 'Seattle Public Schools', countyCouncil: '7', congressional: '7' },
      '98136': { legislative: '34', school: 'Seattle Public Schools', countyCouncil: '1', congressional: '7' },
      '98144': { legislative: '37', school: 'Seattle Public Schools', countyCouncil: '2', congressional: '7' },
      '98146': { legislative: '33', school: 'Highline Public Schools', countyCouncil: '8', congressional: '7' },
      '98155': { legislative: '32', school: 'Lake Washington School District', countyCouncil: '5', congressional: '1' },
      '98177': { legislative: '46', school: 'Seattle Public Schools', countyCouncil: '4', congressional: '7' },
      '98178': { legislative: '33', school: 'Highline Public Schools', countyCouncil: '2', congressional: '9' },
      '98188': { legislative: '33', school: 'Highline Public Schools', countyCouncil: '2', congressional: '9' },
      '98198': { legislative: '33', school: 'Federal Way Public Schools', countyCouncil: '9', congressional: '9' },
      '98199': { legislative: '36', school: 'Seattle Public Schools', countyCouncil: '6', congressional: '7' },
      // Eastside zipcodes
      '98004': { legislative: '41', school: 'Bellevue School District', countyCouncil: '1', congressional: '9' },
      '98005': { legislative: '41', school: 'Bellevue School District', countyCouncil: '1', congressional: '9' },
      '98006': { legislative: '41', school: 'Bellevue School District', countyCouncil: '9', congressional: '9' },
      '98007': { legislative: '41', school: 'Bellevue School District', countyCouncil: '1', congressional: '9' },
      '98008': { legislative: '41', school: 'Bellevue School District', countyCouncil: '1', congressional: '9' },
      '98027': { legislative: '48', school: 'Issaquah School District', countyCouncil: '3', congressional: '8' },
      '98029': { legislative: '48', school: 'Issaquah School District', countyCouncil: '3', congressional: '8' },
      '98033': { legislative: '45', school: 'Lake Washington School District', countyCouncil: '6', congressional: '1' },
      '98034': { legislative: '45', school: 'Lake Washington School District', countyCouncil: '6', congressional: '1' },
      '98039': { legislative: '41', school: 'Bellevue School District', countyCouncil: '1', congressional: '9' },
      '98040': { legislative: '41', school: 'Mercer Island School District', countyCouncil: '8', congressional: '9' },
      '98052': { legislative: '45', school: 'Lake Washington School District', countyCouncil: '6', congressional: '1' },
      '98053': { legislative: '45', school: 'Lake Washington School District', countyCouncil: '6', congressional: '1' },
      '98056': { legislative: '11', school: 'Renton School District', countyCouncil: '7', congressional: '9' },
      '98057': { legislative: '11', school: 'Renton School District', countyCouncil: '7', congressional: '9' },
      '98058': { legislative: '11', school: 'Renton School District', countyCouncil: '7', congressional: '9' },
      '98059': { legislative: '11', school: 'Renton School District', countyCouncil: '7', congressional: '9' },
      '98074': { legislative: '48', school: 'Lake Washington School District', countyCouncil: '3', congressional: '1' },
      '98075': { legislative: '48', school: 'Lake Washington School District', countyCouncil: '3', congressional: '1' },
      // South King County
      '98002': { legislative: '30', school: 'Auburn School District', countyCouncil: '9', congressional: '8' },
      '98003': { legislative: '30', school: 'Federal Way Public Schools', countyCouncil: '9', congressional: '9' },
      '98023': { legislative: '30', school: 'Federal Way Public Schools', countyCouncil: '9', congressional: '9' },
      '98030': { legislative: '30', school: 'Kent School District', countyCouncil: '9', congressional: '9' },
      '98031': { legislative: '30', school: 'Kent School District', countyCouncil: '9', congressional: '9' },
      '98032': { legislative: '30', school: 'Kent School District', countyCouncil: '9', congressional: '9' },
      '98042': { legislative: '47', school: 'Kent School District', countyCouncil: '9', congressional: '8' },
    };

    const result = districtMap[zipCode];

    if (!result) {
      // Provide helpful message with link to King County district finder
      return {
        legislative: 'Not found',
        school: 'Not found',
        countyCouncil: 'Not found',
        congressional: 'Not found',
        needsLookup: true
      };
    }

    // Return the result which already includes congressional district
    return {
      legislative: result.legislative,
      school: result.school,
      countyCouncil: result.countyCouncil,
      congressional: result.congressional,
    };
  };

  // Function to call Google Civic Information API
  // Currently unused - keeping for future reference
  /*
  const lookupDistrictsWithAPI = async (address: string) => {
    const API_KEY = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;

    if (!API_KEY) {
      console.log('Google Civic API key not found, using fallback ZIP lookup');
      return null;
    }

    try {
      const url = `https://www.googleapis.com/civicinfo/v2/representatives?address=${encodeURIComponent(address)}&key=${API_KEY}`;
      console.log('Calling Google Civic API for address:', address);

      const response = await fetch(url);

      if (!response.ok) {
        console.error('API request failed with status:', response.status);
        throw new Error('API request failed');
      }

      const data = await response.json();
      console.log('Google Civic API response:', data);

      // Extract district information from the API response
      const divisions = data.divisions || {};
      const districtInfo: any = {
        legislative: 'Unknown',
        school: 'Unknown',
        countyCouncil: 'Unknown',
        congressional: 'Unknown',
      };

      // Parse divisions to extract district numbers
      Object.keys(divisions).forEach((divisionId) => {
        console.log('Processing division:', divisionId);

        if (divisionId.includes('sldl')) {
          // State Legislative District - Lower
          const match = divisionId.match(/sldl:(\d+)/);
          if (match) {
            districtInfo.legislative = match[1];
            console.log('Found Legislative District:', match[1]);
          }
        } else if (divisionId.includes('/cd:')) {
          // Congressional District
          const match = divisionId.match(/cd:(\d+)/);
          if (match) {
            districtInfo.congressional = match[1];
            console.log('Found Congressional District:', match[1]);
          }
        }
      });

      // For county council and school districts, we still use ZIP lookup as Google API doesn't provide these
      const zipDistricts = lookupDistrictsByZip(addressForm.zipCode);
      if (!zipDistricts.needsLookup) {
        districtInfo.countyCouncil = zipDistricts.countyCouncil;
        districtInfo.school = zipDistricts.school;
        console.log('Using ZIP lookup for County Council and School District');
      }

      console.log('Final district info:', districtInfo);
      return districtInfo;
    } catch (error) {
      console.error('Error calling Google Civic API:', error);
      return null;
    }
  };
  */

  // Function to lookup districts using the EXACT same API as King County's Find My District
  const lookupDistrictsWithKingCounty = async (address: string) => {
    try {
      // Use World Geocoder (same as King County)
      const geocodeUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${encodeURIComponent(address)}&countryCode=USA&f=json&outFields=*`;

      console.log('Geocoding address:', address);
      const geocodeResponse = await fetch(geocodeUrl);
      const geocodeData = await geocodeResponse.json();

      if (!geocodeData.candidates || geocodeData.candidates.length === 0) {
        console.error('Address not found');
        return null;
      }

      const location = geocodeData.candidates[0].location;
      const { x, y } = location;
      console.log('Coordinates:', { x, y });

      // Use King County's DistrictsReport MapServer
      const queryParams = `geometry=${x},${y}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=false&f=json`;

      // King County Districts Report MapServer
      // Layer 12: Legislative Districts (legdst)
      // Layer 11: Congressional Districts (congdst)
      // Layer 9: County Council Districts (KCCDST)
      // Layer 14: School Districts (schdst)
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

      console.log('=== API Responses ===');
      console.log('Legislative District:', ldData);
      console.log('Congressional District:', cdData);
      console.log('County Council:', ccData);
      console.log('School District:', sdData);

      const districtInfo: any = {
        legislative: 'Unknown',
        congressional: 'Unknown',
        countyCouncil: 'Unknown',
        school: 'Unknown',
      };

      // Parse Legislative District (layer 12, field: LEGDST)
      if (ldData.features && ldData.features.length > 0) {
        const attrs = ldData.features[0].attributes;
        console.log('=== LD Attributes ===', attrs);

        if (attrs.LEGDST) {
          districtInfo.legislative = String(attrs.LEGDST);
          console.log('Found Legislative District:', districtInfo.legislative);
        }
      }

      // Parse Congressional District (layer 11, field: CONGDST)
      if (cdData.features && cdData.features.length > 0) {
        const attrs = cdData.features[0].attributes;
        console.log('=== CD Attributes ===', attrs);

        if (attrs.CONGDST) {
          districtInfo.congressional = String(attrs.CONGDST);
          console.log('Found Congressional District:', districtInfo.congressional);
        }
      }

      // Parse County Council District (layer 9, field: kccdst or COUNCILMEM)
      if (ccData.features && ccData.features.length > 0) {
        const attrs = ccData.features[0].attributes;
        console.log('=== CC Attributes ===', attrs);

        if (attrs.kccdst) {
          districtInfo.countyCouncil = String(attrs.kccdst);
          console.log('Found County Council District:', districtInfo.countyCouncil);
        } else if (attrs.COUNCILMEM) {
          // COUNCILMEM might contain the council member name, extract district number if present
          const match = String(attrs.COUNCILMEM).match(/\d+/);
          if (match) {
            districtInfo.countyCouncil = match[0];
            console.log('Found County Council District from COUNCILMEM:', districtInfo.countyCouncil);
          }
        }
      }

      // Parse School District (layer 14, fields: NAME, SCHDST, DSTNUM)
      if (sdData.features && sdData.features.length > 0) {
        const attrs = sdData.features[0].attributes;
        console.log('=== School District Attributes ===', attrs);

        // Try the specified field names in order
        if (attrs.NAME) {
          districtInfo.school = attrs.NAME;
          console.log('Found School District (NAME):', districtInfo.school);
        } else if (attrs.SCHDST) {
          districtInfo.school = attrs.SCHDST;
          console.log('Found School District (SCHDST):', districtInfo.school);
        } else if (attrs.DSTNUM) {
          districtInfo.school = attrs.DSTNUM;
          console.log('Found School District (DSTNUM):', districtInfo.school);
        }
      }

      // Fallback to ZIP code lookup if any district is still unknown
      if (districtInfo.school === 'Unknown') {
        const zipDistricts = lookupDistrictsByZip(addressForm.zipCode);
        if (!zipDistricts.needsLookup) {
          districtInfo.school = zipDistricts.school;
        }
      }

      console.log('=== Final District Info ===', districtInfo);
      return districtInfo;

    } catch (error) {
      console.error('Error calling King County GIS API:', error);
      return null;
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse the full address
    const addressParts = fullAddress.split(',').map(part => part.trim());
    let street = '';
    let city = 'Seattle';
    let zipCode = '';

    if (addressParts.length >= 1) {
      street = addressParts[0];
    }
    if (addressParts.length >= 2) {
      city = addressParts[1];
    }
    if (addressParts.length >= 3) {
      // Extract ZIP code from the last part (e.g., "WA 98101" or just "98101")
      const lastPart = addressParts[addressParts.length - 1];
      const zipMatch = lastPart.match(/\d{5}/);
      if (zipMatch) {
        zipCode = zipMatch[0];
      }
    }

    // Update addressForm state
    setAddressForm({ street, city, zipCode });

    // Try King County GIS API first
    const gisDistricts = await lookupDistrictsWithKingCounty(fullAddress);

    let districts;
    if (gisDistricts && gisDistricts.legislative !== 'Unknown') {
      // Use GIS results
      districts = gisDistricts;
    } else {
      // Fallback to ZIP code lookup
      districts = lookupDistrictsByZip(zipCode);
    }

    setUserAddress({
      street,
      city,
      zipCode,
      state: 'WA',
      legislativeDistrict: districts.legislative,
      congressionalDistrict: districts.congressional,
      schoolDistrict: districts.school,
      countyCouncilDistrict: districts.countyCouncil,
    });
  };

  const checklistItems = [
    t('home.checklist1'),
    t('home.checklist2'),
    t('home.checklist3'),
    t('home.checklist4'),
    t('home.checklist5'),
    t('home.checklist6'),
    t('home.checklist7'),
    t('home.checklist8'),
    t('home.checklist9'),
    t('home.checklist10'),
  ];

  const handleCheckboxToggle = (index: number) => {
    const newCheckedItems = {
      ...checkedItems,
      [index]: !checkedItems[index],
    };
    setCheckedItems(newCheckedItems);
    // Save to localStorage
    localStorage.setItem('voterChecklist', JSON.stringify(newCheckedItems));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-6">
        {/* Election Selector */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
          <label className="block text-lg font-semibold mb-3 text-gray-800">
            {t('home.selectElection')}
          </label>
          <select
            value={selectedElection?.id || ''}
            onChange={(e) => {
              const election = elections.find((el) => el.id === e.target.value);
              if (election) setSelectedElection(election);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 hover:bg-white"
          >
            {elections.map((election) => (
              <option key={election.id} value={election.id}>
                {election.name} - {election.date}
              </option>
            ))}
          </select>
        </div>

        {/* Countdown */}
        {selectedElection && (
          <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>
            <div className="relative z-10">
              <h2 className="text-lg font-semibold mb-3 opacity-95">Next Election</h2>
              <div className="text-6xl font-bold mb-2 tracking-tight">{daysUntilElection} <span className="text-3xl font-normal">Days</span></div>
              <p className="text-lg font-medium">
                until {selectedElection.name}
              </p>
              <p className="text-sm mt-2 opacity-90">{selectedElection.date}</p>
            </div>
          </div>
        )}

        {/* Address Input and Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Address Input */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {t('home.enterAddress')}
            </h2>
            <p className="text-gray-600 text-sm mb-5">
              Enter your address once to personalize your voter information throughout the site.
            </p>
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('home.fullAddress')}
                </label>
                <input
                  type="text"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 hover:bg-white"
                  placeholder="123 Main St, Seattle, WA 98101"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {t('home.saveAddress')}
              </button>
            </form>
            {userAddress && (
              <div className="mt-5">
                {userAddress.legislativeDistrict === 'Not found' ? (
                  <div className="p-5 bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-lg">
                    <div className="flex items-start mb-3">
                      <svg className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div className="flex-1">
                        <h3 className="text-yellow-900 font-bold text-xl mb-3">ZIP Code Not in Database</h3>
                        <p className="text-yellow-800 mb-4 leading-relaxed">
                          We don't have district information for ZIP code <strong>{userAddress.zipCode}</strong> in our database. This may be outside King County or require more specific address information.
                        </p>
                        <div className="bg-white bg-opacity-50 p-4 rounded-lg mb-4">
                          <p className="text-yellow-900 font-semibold mb-2">
                            📍 Find Your Exact Districts:
                          </p>
                          <p className="text-yellow-800 text-sm mb-3">
                            Use the official King County tool with your complete address for accurate district information.
                          </p>
                        </div>
                        <a
                          href="https://blue.kingcounty.gov/aboutkc/redistricting/findmydistrict.aspx"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-all font-bold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Find My Districts (Official Tool)
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                    <div className="flex items-center mb-3">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <h3 className="text-green-800 font-bold text-lg">Your Districts</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-2 border-b border-green-200">
                        <span className="text-gray-600 font-medium">Address:</span>
                        <span className="text-gray-800 font-semibold">{userAddress.street}, {userAddress.city}, {userAddress.state} {userAddress.zipCode}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-green-200">
                        <span className="text-gray-600 font-medium">Congressional District:</span>
                        <span className="text-green-800 font-bold text-base">{userAddress.congressionalDistrict || 'Unknown'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-green-200">
                        <span className="text-gray-600 font-medium">Legislative District:</span>
                        <span className="text-green-800 font-bold text-base">{userAddress.legislativeDistrict}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-green-200">
                        <span className="text-gray-600 font-medium">King County Council District:</span>
                        <span className="text-green-800 font-bold text-base">{userAddress.countyCouncilDistrict}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">School District:</span>
                        <span className="text-green-800 font-bold text-base">{userAddress.schoolDistrict}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-5 text-gray-800">
              {t('home.quickChecklist')}
            </h2>
            <ul className="space-y-3 text-gray-800">
              {checklistItems.map((item, index) => (
                <li key={index} className="flex items-start leading-relaxed">
                  <input
                    type="checkbox"
                    id={`checklist-${index}`}
                    checked={checkedItems[index] || false}
                    onChange={() => handleCheckboxToggle(index)}
                    className="w-5 h-5 mr-3 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                  />
                  <label
                    htmlFor={`checklist-${index}`}
                    className={`text-base cursor-pointer select-none ${
                      checkedItems[index] ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Link
          to="/get-ready"
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:border-primary-200 transition-all transform hover:-translate-y-1 group"
        >
          <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-primary-800 transition-colors">
            {t('nav.getReady')}
          </h3>
          <p className="text-gray-600 text-sm">
            Everything you need to prepare for voting in King County.
          </p>
        </Link>
        <Link
          to="/how-to-vote"
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:border-primary-200 transition-all transform hover:-translate-y-1 group"
        >
          <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-primary-800 transition-colors">
            {t('nav.returnBallot')}
          </h3>
          <p className="text-gray-600 text-sm">
            Learn about mail-in voting, early voting, and election day procedures.
          </p>
        </Link>
        <Link
          to="/help"
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:border-primary-200 transition-all transform hover:-translate-y-1 group"
        >
          <h3 className="text-xl font-bold text-primary-700 mb-2 group-hover:text-primary-800 transition-colors">
            {t('nav.help')}
          </h3>
          <p className="text-gray-600 text-sm">
            Get answers to common questions and access helpful resources.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
