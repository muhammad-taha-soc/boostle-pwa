import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { findBusiness, getBusinessInformation, getGrantPreviewResults } from '../../utilities/apiCalls';

const GrantPreview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (currentSearchTerm) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const payload = { params: { q: currentSearchTerm } };
      const response = await findBusiness(payload);
      setCompanies(response.result || []);
    } catch (error) {
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCompany = async (company) => {
    setSelectedCompany(company);
    setLoading(true);
    try {
      const payload = { companyId: company.company_number };
      const profileResponse = await getBusinessInformation(payload);
      const businessId = profileResponse.result._id;
      const payload2 = { business: businessId };
      const grantResponse = await getGrantPreviewResults(payload2);
      setSelectedGrant(grantResponse.result.grants[0] || null);
    } catch (error) {
      setSelectedGrant(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    setSelectedCompany(null);
    setSelectedGrant(null);
    setHasSearched(false);
    setCompanies([]);
    setSearchTerm('');
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          color: '#fff',
          p: 4,
          position: 'relative',
          background: 'linear-gradient(135deg, #6a11cb, #2575fc)', // Softer gradient background
          overflow: 'hidden',
          fontFamily: 'Poppins',
        }}
      >
        {/* Animated Waves */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent)', // Softer wave effect
              borderRadius: '50%',
              animation: 'rotate-wave 10s linear infinite',
            },
            '&::after': {
              animation: 'rotate-wave-reverse 12s linear infinite',
            },
          }}
        />

        {/* Main Content */}
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', p: 4 }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            mb={2}
            sx={{
              textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
              animation: 'fade-in 2s ease-out',
              fontFamily: 'Poppins',
             
              color: '#fff',
            }}
          >
            Discover Grants Tailored for Your Business
          </Typography>

          {/* Subtext */}
          <Typography variant="h6" mb={4} sx={{ opacity: 0.8, lineHeight: 1.6, fontFamily: 'Poppins' }}>
            Unlock funding opportunities and boost your business growth. <br />
            With Ailsa, finding and applying for grants has never been easier.
          </Typography>

          {/* CTA */}
          {/* <Button
            variant="contained"
            size="large"
            sx={{
              mb: 4,
              fontFamily: 'Poppins',
              backgroundColor: '#5E17EB',
              '&:hover': { backgroundColor: '#0AFFED', color: '#5E17EB' },
            }}
          >
            Find Grants for Your Business
          </Button> */}

          <Grid container spacing={3} justifyContent="center">
            {[
              { title: 'AI-Driven Insights', text: 'Get grants tailored to your business needs.' },
              { title: 'Save Time', text: 'Let our algorithms do the heavy lifting for you.' },
              { title: 'End-to-End Support', text: "From search to application, we've got you covered." },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                    transition: 'transform 0.3s ease-in-out',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" fontFamily="Poppins">
                      {item.title}
                    </Typography>
                    <Typography variant="body1" mt={2} fontFamily="Poppins">
                      {item.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* Testimonials or Trust Section */}
          <Box mt={6}>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={2}
              sx={{ textShadow: '1px 1px 5px rgba(0,0,0,0.3)', fontFamily: 'Poppins' }}
            >
              Trusted by Businesses Nationwide
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, fontFamily: 'Poppins' }}>
              Over $10M in grants unlocked for our users!
            </Typography>
          </Box>
          {selectedCompany && (
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleBackClick}
              sx={{
                mb: 3,
                color: '#fff',
                fontFamily: 'Poppins',
                borderColor: '#fff',
                '&:hover': { backgroundColor: '#fff', color: '#2575fc' }, // Complementary hover color
              }}
            >
              Back
            </Button>
          )}

          {!selectedCompany ? (
            <>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2} justifyContent="center" mb={4}>
                <TextField
                  label="Search for your company"
                  variant="filled"
                  fullWidth
                  sx={{
                    maxWidth: 600,
                    mr: 2,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    fontFamily: 'Poppins',
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  variant="outlined"
                  onClick={() => handleSearch(searchTerm)}
                  color="#fff"
                  size="large"
                  sx={{
                    // Matching button color
                    fontFamily: 'Poppins',
                    padding: '10px 20px',
                    '&:hover': { backgroundColor: '#fff', color: '#6a11cb', transform: 'scale(1.05)' },
                    borderRadius: 5,
                    // Smooth transition for hover effect
                  }}
                >
                  Search
                </Button>
              </Box>

              {loading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress sx={{ color: '#6a11cb' }} />
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {companies.length > 0
                    ? companies.map((company) => (
                        <Grid item xs={12} sm={6} md={4} key={company.company_number}>
                          <Card
                            onClick={() => handleSelectCompany(company)}
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: 8,
                              },
                              transition: 'transform 0.3s ease-in-out',
                              backgroundColor: '#fff', // White background for cards
                              borderRadius: 3,
                              boxShadow: 3, // Light shadow for a sleek look
                            }}
                          >
                            <CardContent>
                              <Typography variant="h6" fontWeight="bold" fontFamily="Poppins">
                                {company.company_name}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))
                    : hasSearched && (
                        <Typography
                          variant="body1"
                          textAlign="center"
                          sx={{ color: '#fff', opacity: 0.7, fontFamily: 'Poppins' }}
                        >
                          No companies found. Please try a different search term.
                        </Typography>
                      )}
                </Grid>
              )}
            </>
          ) : (
            <Box>
              {loading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress sx={{ color: '#6a11cb' }} />
                </Box>
              ) : selectedGrant ? (
                <Card
                  sx={{
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
                      {selectedGrant.name}
                    </Typography>
                    <Box mt={2}>
                      <Typography variant="body1" fontFamily="Poppins">
                        <strong>Funder:</strong> {selectedGrant.funder}
                      </Typography>
                      <Typography variant="body1" fontFamily="Poppins">
                        <strong>Max Award:</strong> ${selectedGrant.max_award_amount}
                      </Typography>
                      <Typography variant="body1" fontFamily="Poppins">
                        <strong>Location:</strong> {selectedGrant.location.join(', ')}
                      </Typography>
                      <Typography variant="body1" fontFamily="Poppins">
                        <strong>Valid From:</strong> {selectedGrant.valid_from}
                      </Typography>
                      <Typography variant="body1" fontFamily="Poppins">
                        <strong>Valid To:</strong> {selectedGrant.valid_to}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        mt: 3,
                        backgroundColor: '#0AFFED',
                        color: '#5E17EB',
                        '&:hover': { backgroundColor: '#5E17EB', color: '#fff' },
                      }}
                    >
                      Unlock Full Details with Premium
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Typography
                  variant="body1"
                  textAlign="center"
                  sx={{ color: '#fff', opacity: 0.7, fontFamily: 'Poppins' }}
                >
                  No grants found for the selected company.
                </Typography>
              )}
            </Box>
          )}
        </Box>

        <style>
          {`
        @keyframes rotate-wave {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }
  
        @keyframes rotate-wave-reverse {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.75);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}
        </style>
      </Box>
    </>
  );
};

export default GrantPreview;
