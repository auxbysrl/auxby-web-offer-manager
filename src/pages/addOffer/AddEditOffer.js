import "./AddEditOffer.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import AppNavBar from "../../components/navbar/AppNavBar";
import { getCategoriesDetails, addNewOffer, addOfferImages, editOffer } from "../../redux/actions/offers";
import { Box, Stack, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FormControlLabel, FormControl } from '@mui/material';
import { Radio, RadioGroup } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PictureGrid from "../../components/pictures/PictureGrid";

export default function AddEditOffer() {
  const { isLoggedIn } = useSelector(state => state.auth);
  const { userDetails } = useSelector(state => state.user);
  const { categoriesDetails } = useSelector(state => state.offers);
  const [photoList, setPhotoList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSubCategory] = useState(null);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [parentDropDownValue, setParentDropDownValue] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [successful, setSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  const [formData, setFormData] = useState({
    auctionEndDate: location.state ? location.state.offer.auctionEndDate : "",
    categoryId: location.state ? location.state.offer.categoryId : "",
    title: location.state ? location.state.offer.title : "",
    offerType: location.state ? location.state.offer.offerType : "Auction",
    price: location.state ? location.state.offer.price : "",
    requiredCoins: selectedCategory ? selectedCategory.addOfferCost : 0,
    currencyType: location.state ? capitalizeFirstLetter(location.state.offer.currencyType) : "Ron",
    conditionType: location.state ? capitalizeFirstLetter(location.state.offer.condition) : "Used",
    description: location.state ? location.state.offer.description : "",
    contactInfo: {
      location: location.state ? location.state.offer.location : "",
      phoneNumber: location.state ? location.state.offer.phoneNumbers : ""
    },
    autoExtend: false,
    categoryDetails: []
  });

  const currencies = [
    {
      value: 'Ron',
      label: 'lei',
    },
    {
      value: 'Euro',
      label: '€',
    },
  ];

  const navbarInfo = {
    showSearch: false,
    showAddBtn: false,
    showLogOut: true
  };

  useEffect(() => {
    //getCategoriesDetails();
    dispatch(getCategoriesDetails())
      .then((data) => {
        const category = data.filter(cat => cat.id == location.state.offer.categoryId);
        setSelectedCategory(category[0])
        setPhotoList(location.state.offer.photos.map(item => item.url))
      })
      .catch((error) => {

      });
  }, []);

  useEffect(() => {
    if (selectedCategory !== null) {
      const category = categoriesDetails.filter(cat => cat.id == selectedCategory.id);
      setAvailableSubcategories(category[0].subcategories);
    } else {
      setAvailableSubcategories([]);
    }
  }, [selectedCategory]);

  const handleParentDropDownChange = (event) => {
    setParentDropDownValue(event.target.value);
    handleDynamicInputChange(event)

  };

  const handleImagesChange = (images) => {
    setPhotoList(images)
  };

  const getLabelName = (label) => {
    if (label.length == 0) return ""
    const result = label.filter(word => word.language == "ro");
    return result[0].translation
  }

  const getChildOptions = (options) => {
    if (!parentDropDownValue) return []
    let child = options.filter(option => option.parentOption == parentDropDownValue.name)[0]
    if (!child) return []
    return child.childOptions
  }

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setFormData({
      ...formData,
      categoryId: category.id,
      requiredCoins: category.addOfferCost
    });
  };

  const handleSubcategoryChange = (event) => {
    const subcategory = event.target.value;
    setSubCategory(subcategory)
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'location' || name === 'phoneNumber') {
      setFormData({
        ...formData,
        contactInfo: {
          ...formData.contactInfo,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDynamicInputChange = (event) => {
    const name = event.target.name;
    const valueName = event.target.value.name ? event.target.value.name : event.target.value
    const detailIndex = formData.categoryDetails.findIndex((detail) => detail.key === name);


    if (detailIndex === -1) {
      // If detail with the same key doesn't exist, add a new object
      const newDetail = { key: name, value: valueName };
      setFormData({ ...formData, categoryDetails: [...formData.categoryDetails, newDetail] });
    } else {
      // If detail with the same key exists, update its value
      const newCategoryDetails = [...formData.categoryDetails];
      newCategoryDetails[detailIndex] = { ...newCategoryDetails[detailIndex], valueName };
      setFormData({ ...formData, categoryDetails: newCategoryDetails });
    }

  };

  const handleDynamicDropDownChange = (event) => {
    const name = event.target.name;
    const value = event.target.value.name ? event.target.value.name : event.target.value
    const detailIndex = formData.categoryDetails.findIndex((detail) => detail.key === name);
    const valueName =value.label?.length > 0? value.label.filter(i => i.language == "ro")[0].translation: value.name

    if (detailIndex === -1) {
      // If detail with the same key doesn't exist, add a new object
      const newDetail = { key: name, value: valueName };
      setFormData({ ...formData, categoryDetails: [...formData.categoryDetails, newDetail] });
    } else {
      // If detail with the same key exists, update its value
      const newCategoryDetails = [...formData.categoryDetails];
      newCategoryDetails[detailIndex] = { ...newCategoryDetails[detailIndex], valueName };
      setFormData({ ...formData, categoryDetails: newCategoryDetails });
    }

  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("")

    location.state ? editOfferRequest() : addOfferRequest()
  };

  const addOfferRequest = () => {
    dispatch(addNewOffer(formData))
      .then((data) => {
        // add offer images
        if (photoList.length > 0) {
          addOfferImagesRequest(data.id)
        } else {
          navigate("/")
          window.location.reload();
          setLoading(false);
        }
      })
      .catch((error) => {
        window.scrollTo(0, 0)
        setLoading(false);
        setErrorMessage(error.response.data.message)
      });
  };

  const editOfferRequest = () => {
    dispatch(editOffer(location.state.offer.id, formData))
      .then((data) => {
        console.log(photoList)
        if (photoList.length > 0) {
          addOfferImagesRequest(data.id)
        } else {
          navigate("/")
          window.location.reload();
          setLoading(false);
        }
      })
      .catch((error) => {
        window.scrollTo(0, 0)
        setLoading(false);
        setErrorMessage(error.response.data.message)
      });
  };

  const addOfferImagesRequest = (offerId) => {
    dispatch(addOfferImages(offerId, photoList))
      .then((data) => {
        navigate("/")
        window.location.reload();
        setLoading(false);
      })
      .catch((error) => {
        window.scrollTo(0, 0)
        setLoading(false);
        setErrorMessage(error.response.data.message)
      });
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const renderCategoryDetails = (categoryDetails) => {
    return categoryDetails.map((item) => {
      switch (item.type) {
        case "drop_down":
          return (
            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <FormControl fullWidth>
                <InputLabel required={item.required}>{getLabelName(item.label)}</InputLabel>
                {item.parent.length == 0 ? (
                  <Select
                    name={item.name}
                    required={item.required}
                    label={getLabelName(item.label)}
                    onChange={handleParentDropDownChange}
                  >
                    {item.options.map((option) => (
                      <MenuItem key={option.id} value={option}>{option.name ? option.name : getLabelName(option.label)}</MenuItem>
                    ))}
                  </Select>) :
                  (
                    <Select
                      disabled={!parentDropDownValue || getChildOptions(item.options).length == 0}
                      required={item.required}
                      label={getLabelName(item.label)}
                      name={item.name}
                      onChange={handleDynamicDropDownChange}
                    >
                      {getChildOptions(item.options).map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>)}

              </FormControl>
            </Box>
          );
        case "text_input":
          return (
            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <TextField
                fullWidth
                type={item.constraints && item.constraints.inputType == "numeric" ? "number" : "text"}
                required={item.required}
                maxLines={item.constraints && item.constraints.maxLines}
                placeholder={item.placeholder}
                label={getLabelName(item.label)}
                variant="outlined"
                name={item.name}
                onChange={handleDynamicInputChange}
              />
            </Box>
          );
        case "radio_box":
          return (
            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <InputLabel required={item.required} >{getLabelName(item.label)}</InputLabel>
              <RadioGroup
                row
                defaultValue="used"
                spacing={60}
                name={item.name}
                onChange={handleDynamicInputChange}>
                {item.options.map((option) => (
                  <FormControlLabel
                    key={option.name}
                    value={option.name ? option.name : getLabelName(option.label)}
                    control={<Radio />}
                    label={option.name ? option.name : getLabelName(option.label)}
                  />
                ))}
              </RadioGroup>
            </Box>
          );
        default:
          return null;
      }
    });
  };

  return (
    <Stack container direction="column">
      <AppNavBar displayInfo={navbarInfo} />
      <Box sx={{ display: 'flex', justifyContent: 'center', background: "rgba(59, 75, 83, 0.05)", padding: "40px" }}>
        <Stack
          component="form"
          direction={"column"}
          spacing={3}
          onSubmit={handleSubmit}>

          {errorMessage && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {errorMessage}
              </div>
            </div>
          )}

          <Stack
            container
            alignSelf="center"
            className="add-offer-container"
            direction="column" spacing={3}>
            <p className="card-title">Categoria</p>

            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <FormControl fullWidth>
                <InputLabel required>Categoria</InputLabel>
                <Select
                  required
                  value={selectedCategory ? selectedCategory : ''}
                  onChange={handleCategoryChange}
                  label="Categoria"
                >
                  {categoriesDetails.map((category) => (
                    <MenuItem key={category.id} value={category}>{getLabelName(category.label)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box
              hidden={availableSubcategories.length === 0}
              sx={{ width: "70vh", alignSelf: "center" }}>
              <FormControl fullWidth>
                <InputLabel required={selectedCategory && availableSubcategories.length > 0}>Subcategoria</InputLabel>
                <Select
                  required={selectedCategory && availableSubcategories.length > 0}
                  label="Subcategoria"
                  onChange={handleSubcategoryChange}
                >
                  {availableSubcategories.map((category) => (
                    <MenuItem key={category.id} value={category}>{getLabelName(category.label)}</MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Box>
          </Stack>

          <Stack
            container
            alignSelf="center"
            className="add-offer-container"
            direction="column" spacing={3}>
            <p className="card-title">Detalii offertă</p>

            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <TextField
                fullWidth
                required
                type='text'
                label="Titlu"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                variant="outlined" />
            </Box>

            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <InputLabel required>Tipul ofertei</InputLabel>
              <RadioGroup
                row
                spacing={60}
                defaultValue="Auction"
                name="offerType"
                value={formData.offerType}
                onChange={handleInputChange}
              >
                <FormControlLabel value="Auction" control={<Radio />} label="Licitatie" />
                <FormControlLabel value="Fix price" control={<Radio />} label="Pret fix" />
              </RadioGroup>
            </Box>

            <Box sx={{ width: "70vh", alignSelf: "center" }} hidden={formData.offerType == "Fix price"}>
              <TextField
                fullWidth
                id="endDate"
                label="Data de încheiere"
                type="date"
                name="auctionEndDate"
                value={formData.auctionEndDate}
                onChange={handleInputChange}
                required={formData.offerType == "Auction"}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  format: 'yyyy-MM-dd',
                }}
              />
            </Box>
            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <Stack direction="row" gap={2} fullWidth>
                <TextField
                  required
                  sx={{ width: "80%" }}
                  type='number'
                  label="Pret"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  variant="outlined" />

                <TextField
                  sx={{ width: "20%" }}
                  select
                  required
                  defaultValue={currencies[0].value}
                  name="currencyType"
                  value={formData.currencyType}
                  onChange={handleInputChange}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Box>
            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <InputLabel required>Condiție</InputLabel>
              <RadioGroup
                row
                defaultValue="Used"
                spacing={60}
                name="conditionType"
                value={formData.conditionType}
                onChange={handleInputChange}
              >
                <FormControlLabel value="Used" control={<Radio />} label="Utilizat" />
                <FormControlLabel value="New" control={<Radio />} label="Nou" />
              </RadioGroup>
            </Box>

            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <PictureGrid onImagesChange={handleImagesChange} photoList={photoList} />
            </Box>

            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <TextField
                fullWidth
                required
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                helperText="0/8000"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Box>

          </Stack>

          {selectedCategory && selectedCategory.categoryDetails.length > 0 && (
            <Stack
              container
              alignSelf="center"
              className="add-offer-container"
              direction="column" spacing={3}>
              <p className="card-title">Detalii categorie</p>

              {selectedSubCategory && renderCategoryDetails(selectedSubCategory.categoryDetails)}
              {selectedCategory && renderCategoryDetails(selectedCategory.categoryDetails)}
            </Stack>
          )}
          <Stack
            container
            alignSelf="center"
            className="add-offer-container"
            direction="column" spacing={3}>
            <p className="card-title">Contact</p>

            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <TextField
                fullWidth
                required
                type='text'
                label="Locație"
                variant="outlined"
                name="location"
                value={formData.contactInfo.location}
                onChange={handleInputChange} />
            </Box>

            <Box sx={{ width: "70vh", alignSelf: "center" }}>
              <TextField
                fullWidth
                required
                type='text'
                label="Număr de telefon"
                name="phoneNumber"
                autoComplete="phone"
                variant="outlined"
                value={formData.contactInfo.phoneNumber}
                onChange={handleInputChange} />
            </Box>
          </Stack>
          {userDetails && !location.state && (
            <InputLabel style={{
              alignSelf: "end",
              color: "#4B86B4",
              fontSize: "18px",
              fontFamily: "Montserrat",
              fontWeight: "800"
            }}>
              <span style={{ color: userDetails.availableCoins >= formData.requiredCoins ? "green" : "red" }}>
                {userDetails.availableCoins >= formData.requiredCoins ? " Aveți suficiente monede pentru a posta această ofertă" : ` Aveți nevoie de încă ${formData.requiredCoins - userDetails.availableCoins} monede pentru a posta această ofertă. `}
                {userDetails.availableCoins < formData.requiredCoins && <Link to="/" style={{ color: "red", fontWeight: "bold" }}>Cumpară mai multe</Link>}
              </span>
            </InputLabel>
          )}
          <LoadingButton
            type="submit"
            loading={loading}
            style={{
              alignSelf: "end",
              width: "310px",
              borderRadius: 8,
              backgroundColor: "#4B86B4",
              padding: "8px",
              fontSize: "18px",
              fontFamily: "Montserrat",
              fontWeight: "600",
              cursor: 'pointer',
              textTransform: "none"
            }}
            variant="contained">
            {location.state ? <span>Editeză</span> : <span>Postează pentru {formData.requiredCoins} coins</span>}
          </LoadingButton>
        </Stack>
      </Box>
    </Stack>
  );
}
