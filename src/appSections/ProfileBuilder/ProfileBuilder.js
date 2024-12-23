/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ProtectedLayout from '../../layouts/protectedLayout';
import { Grid, Box, Typography, TextField, InputAdornment, IconButton, Button, TextareaAutosize,Autocomplete,Chip,Dialog,DialogTitle,DialogContent,DialogActions } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MaterialButton from '../../components/Button/MaterialButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { getAllGrantResults, updateBusiness } from '../../utilities/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { setBusinessInformation } from '../../redux/actions/setBusinessInformation';
import { useNavigate } from 'react-router-dom';
import Joyride from 'react-joyride';
import { STATUS } from'react-joyride';
function ProfileBuilder() {
  const navigate = useNavigate();
  const [linkedin, setLinkedIn] = useState('');
  const [facebook, setFacebook] = useState('');
  const [glassdoor, setGlassdoor] = useState('');
  const [website,setWebsite]=useState('');
  const [otherLinks, setOtherLinks] = useState([{ id: 1, url: '' }]);
  const [desc, setDesc] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [operatingaddress,setOperatingAddress]=useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showdialog,setShowDialog] = useState(false);
  const businessInfo = useSelector((state) => state.business.businessInfo);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([
    {
      target: '.profile-builder', // Targets the element with class 'profile-builder'
      content: 'Welcome, To optimise matching, we recommend filling out your business profile with details like your industry, business goals, financial status and project needs. The more comprehensive your profile, the more accurate your matches will be.',
      placement: 'center',
    },
    {
      target: '.allfields', // Targets the element with class 'allfields'
      content: 'Please fill all the fields to get the best results.',
      placement: 'top',
    },
    {
      target: '.save-button', // Targets the element with class 'save-button'
      content: 'Click on save to save your profile.',
      placement: 'top',
    }
  ]);
  useEffect(() => {
 
    
    if(businessInfo.additional_data){
   
    
      setLinkedIn(businessInfo?.additional_data?.social_media?.linkedin?? '');
      setFacebook(businessInfo?.additional_data?.social_media?.facebook?? '');
      setGlassdoor(businessInfo?.additional_data?.social_media?.glassdoor?? '');
      setWebsite(businessInfo?.additional_data?.url?? '');
      setDesc(businessInfo?.additional_data?.description?? '');
      setOperatingAddress(businessInfo?.additional_data?.operating_address?? '');
      setOtherLinks(businessInfo?.additional_data?.other_links?? []);
    
  }
 
  }, [businessInfo]);
  useEffect(()=>{
    if(userInfo.first_use){
      setRun(true);
    }
  },[])

   const dispatch = useDispatch();
  // Handle the dynamic change of other links
  const handleOtherLinkChange = (index, value) => {
    const updatedLinks = otherLinks.map((link, idx) => (idx === index ? { ...link, url: value } : link));
    setOtherLinks(updatedLinks);
  };

  // Add a new empty link input field
  const addNewLink = () => {
    setOtherLinks([...otherLinks, { id: otherLinks.length + 1, url: '' }]);
  };

  // Clear the specific link input
  const handleClearlinks = (index) => {
    const updatedLinks = otherLinks.map((link, idx) => (idx === index ? { ...link, url: '' } : link));
    setOtherLinks(updatedLinks);
  };
  const handleRemove = (index) => {
    const updatedLinks = otherLinks.filter((_, idx) => idx !== index); // Remove the selected link
    setOtherLinks(updatedLinks);
  };
 
  const handleClear = (platform) => {
    switch (platform) {
      case 'linkedin':
        setLinkedIn('');
        break;
      case 'facebook':
        setFacebook('');
        break;
      case 'glassdoor':
        setGlassdoor('');
        break;
      default:
        break;
    }
  };


  const handledesc = (event) => {
    setDesc(event.target.value);
  };
  const handleToggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag)); // Remove tag
    } else {
      setSelectedTags([...selectedTags, tag]); // Add tag
    }
  };

// Validation function
const validateFields = () => {
  let newErrors = {};
  if (!website.trim()) newErrors.website = 'Website is required';
  if (!desc.trim()) newErrors.desc = 'Description is required';
  if (!operatingaddress.trim()) newErrors.operatingaddress = 'Operating address is required';
  // if (!linkedin.trim()) newErrors.linkedin = 'LinkedIn link is required';
  // if (!facebook.trim()) newErrors.facebook = 'Facebook link is required';
  // if (!glassdoor.trim()) newErrors.glassdoor = 'Glassdoor link is required';
  // otherLinks.forEach((link, index) => {
  //   if (!link.url.trim()) {
  //     newErrors[`otherLink-${index}`] = 'Link is required';
  //   }
  // });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; // Return true if no errors
};

  // Save the business information
  const handleSave = async () => {

    setIsLoading(true);
    if (!validateFields()) return ; 
    const payload = {
     profile: {
      url:website,
      description:desc,
      operating_address:operatingaddress,
      social_media: {
        linkedin:linkedin,
        facebook:facebook,
        glassdoor:glassdoor,
      },
      other_links:otherLinks,
     }
    };  
    const response = await updateBusiness(payload);
    console.log('saved',response);
          if (response.code === 200 && response.result) {
            dispatch(setBusinessInformation(response.result));
          } else if (response.error) { 
            throw new Error(response.error);
          }
          setIsLoading(false);
          setShowDialog(true);
        
      
  };
  const handleCloseDialog = () => {

    setShowDialog(false);
   
  };
  const handleNavigate = () => {
    setShowDialog(false);
    navigate('/home');
  }
  const handleJoyrideCallback = (data) => {
    const { status, type, step } = data;
    console.log('Joyride callback:', status, type, step);
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };
  return (
    <>
   <Joyride
        continuous
        run={run}
        steps={steps}
        callback={handleJoyrideCallback}
        showProgress
        showSkipButton
        styles={{
          options: {
            zIndex: 10000,
            arrowColor: '#404040',
          },
        }}
      />
    <ProtectedLayout isPublic={false}>
        {/* Title and Description */}

        <Grid item xs={12} md={12}  sx={{
          margin:'0 auto',
         
        }} >
        
                <Box
                className='profile-builder'
                  sx={{
                    paddingTop: { xs: 2, md: 2 },
                    textAlign: { xs: 'center', md: 'left' },
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center',
                    
                  }}
                >
                  <Box>
                  {/* Title */}
                  <Typography variant="h4" sx={{ fontFamily:'Poppins', fontWeight: '700', fontSize: { xs: '20px', md: '50px' }, margin: 0 }}>
                    ProfileBuilder
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{ fontFamily:'Poppins', fontWeight: '500', fontSize: { xs: '14px', md: '16px' }, marginTop: { xs: 2, md: 1 } }}
                  >
                    Ailsa gets to know you! The more information you share, the better 
                  </Typography>
                  </Box>
                  <MaterialButton  className='save-button' variant='contained' size='large' onClick={handleSave}>
                    {businessInfo.additional_data ? 'UPDATE' : 'SAVE'}
                    </MaterialButton>
                </Box>
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center' ,gap:'16px',paddingTop: { xs: 2, md: 2 },width:'100%'}}>
                  <MaterialButton  variant='outlined' size='medium' onClick={handleSave}>
                    {businessInfo.additional_data ? 'UPDATE' : 'SAVE'}
                    </MaterialButton>
             
                </Box>
              </Grid> */}

       


        <Grid item xs={12} md={12} sx={{
          margin:'0 auto'
        }} >
        
        <Box   className='allfields'
            sx={{
              padding: '20px',
              border: '1px solid #ddd', // Optional styling for the border
              borderRadius: '8px', // Rounded corners
              // Light background color
              backgroundColor:'#fff',
              display:'flex',
              flexDirection:'column',
              gap:'24px',
            
                
              
            }}
          >
          
      <Typography variant="h4" sx={{ fontFamily:'Poppins', fontWeight: '600', fontSize: { xs: '20px', md: '24px' }, margin: 0 }}>
         Website
        </Typography>
        <TextField
              label="Website"
              placeholder="please add your link to Website"
              error={!!errors.website}
              helperText={errors.website}
              fullWidth
              value={website}
              onChange={(e) => {setWebsite(e.target.value); setErrors({...errors, website: ''})}}
              slotProps={{
                input: {
                  endAdornment: website ? (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setWebsite('')} edge="end">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                
                },
              }}
            />
            <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight: '600', fontSize: { xs: '20px', md: '24px' } }}>
                Business Description
              </Typography>
              <TextField
      label="Write something about your business"
      placeholder="Write something..."
      error={!!errors.desc}
      helperText={errors.desc}
      multiline
      rows={4} // Specifies the number of rows for the textarea
      value={desc}
      onChange={(e) => {setDesc(e.target.value); setErrors({...errors, desc: ''})}}
      variant="outlined" // You can use 'filled' or 'standard' for different styles
      fullWidth // Takes full width of the container
    />
    <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight: '600', fontSize: { xs: '20px', md: '24px' } }}>
                Operating Address
              </Typography>
    <TextField
    label="Operating Address"
    error={!!errors.operatingaddress}
    helperText={errors.operatingaddress}
    placeholder="please add your operating address"
    fullWidth
    value={operatingaddress}
    onChange={(e) => {setOperatingAddress(e.target.value); setErrors({...errors, operatingaddress: ''})}}
    slotProps={{
      input: {
        endAdornment: operatingaddress ? (
          <InputAdornment position="end">
            <IconButton onClick={() => setOperatingAddress('')} edge="end">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      },
    }}
    />
    
    <Typography variant="h4" sx={{ fontFamily:'Poppins', fontWeight: '600', fontSize: { xs: '20px', md: '24px' }, margin: 0 }}>
                 Links to Social Media
                </Typography>
  
             
            <TextField
              label="LinkedIn"
              placeholder="please add your link to LinkedIn"
              fullWidth
              value={linkedin}
              onChange={(e) => setLinkedIn(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: linkedin ? (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setLinkedIn('')} edge="end">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                
                },
              }}
            />

     
      
             <TextField
              label="FaceBook"
              placeholder="please add your link to FaceBook"
              fullWidth
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: linkedin ? (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setFacebook('')} edge="end">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                
                },
              }}
            />

          
    
         
            <TextField
              label="Glassdoor"
              placeholder="please add your link to Glassdoor"
              fullWidth
              value={glassdoor}
              onChange={(e) => setGlassdoor(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: linkedin ? (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setGlassdoor('')} edge="end">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                
                },
              }}
            />
      <Box
            sx={{
              padding: '20px',
              border: '1px solid #ddd', // Optional styling for the border
              borderRadius: '8px', // Rounded corners
              // Light background color
              backgroundColor:'#fff',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ fontFamily:'Poppins', fontWeight: '600', fontSize: { xs: '20px', md: '24px' } }}>
                Other Links
              </Typography>
              <IconButton
                sx={{
                  borderRadius: '50%',
                  border: '1px solid #A259FF',
                  width: '40px',
                  height: '40px',
                  color: '#A259FF',
                }}
                onClick={addNewLink}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* Dynamically added other link fields */}
            {otherLinks.map((link, index) => (
              <Grid item xs={12} md={12} key={link.id} >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }, // Responsive layout
                    alignItems: 'center',
                    gap: '20px',
                    padding: '10px 0',
                  }}
                >
                  <IconButton
                    sx={{
                      color: 'red',
                    }}
                    onClick={() => handleRemove(index)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                    <TextField
              label="Website"
              placeholder="please add your link to FaceBook"
              fullWidth
              value={link.url}
              onChange={(e) => handleOtherLinkChange(index, e.target.value)}
              slotProps={{
                input: {
                  endAdornment: link.url ? (
                    <InputAdornment position="end">
                      {link.url && (
                        <IconButton onClick={() => handleClearlinks(index)} edge="end">
                          <ClearIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ) : null,
                
                },
              }}
            />
                  {/* <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      width: '150px', // Consistent width
                      borderRadius: '30px', // Rounded corners
                      textTransform: 'none', // Prevent uppercase text
                      borderColor: '#A259FF', // Custom border color to match the image
                      color: '#A259FF', // Custom text color
                      fontWeight: 'bold', // Bold text
                      padding: '8px 16px', // Padding for consistency
                    }}
                  >
                    Add Link
                  </Button> */}
                </Box>
              </Grid>
            ))}
          </Box>         
</Box>
          </Grid>
          {/* <Grid item xs={12} md={4} sx={{ paddingTop: '20px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '20px', md: '24px' } }}>
              Grant Types
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap:2,margin:'10px 0' }}>
              {grantTypes.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  onClick={() => handleToggleTag(type)}
                  icon={selectedTags.includes(type) ? <CheckCircleIcon /> : null}
                  color={selectedTags.includes(type) ? 'primary' : 'default'}
                  variant="outlined"
                />
              ))}
            </Box>
            
          </Box>
        </Grid> */}
         {/* {step === 2 && (
          <Box sx={{ position: 'fixed', top: 0, right: 0, width: '100%', height: '100%', backdropFilter: 'blur(4px)', }}> 
          <Box sx={{ position: 'absolute', top: '10%', right: '10%', background: '#f0f0f0', padding: '20px', borderRadius: '10px', zIndex: 1000 }}>
            <Typography>Profile has been build now you can explore grants.</Typography>

          </Box>
          </Box>
          )} */}
          <Dialog
          open={showdialog}
          onClose={handleCloseDialog}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
         
          <DialogTitle id="dialog-title">Profile saved successfully</DialogTitle>
          <DialogContent>
            <Typography id="dialog-description">Now you are ready to explore your grants.</Typography>
            
          </DialogContent>
          <DialogActions>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', padding: '16px 0' }}>
              <MaterialButton variant='contained' size='medium' onClick={handleNavigate}>
                Explore Grants
              </MaterialButton>

            </Box>
          </DialogActions>
        </Dialog>
      
       
    </ProtectedLayout>
    </>
  );
}

export default ProfileBuilder;
