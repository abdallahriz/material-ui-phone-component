import React, { useState, Fragment } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grow,
  ClickAwayListener,
  Paper,
  InputBase
} from '@material-ui/core'
import ReactCountryFlag from 'react-country-flag'
import { countries } from './countries-list'
import {
  PHONE_NUMBER_PLACE_HOLDER,
  SEARCH_INPUT_PLEACE_HOLDER,
  NO_RESULT
} from './constants'

const useStyles = makeStyles((theme) =>
  createStyles({
    TextField: {
      margin: '5px 0',
      width: '70%',
      border: '1px solid #D0D0D0',
      borderRadius: 5,
      '& > div': {
        '& > fieldset': {
          border: 0
        }
      }
    },
    input: {
      padding: 10,
      width: '100%'
    },
    paperRoot: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      boxShadow: 'none',
      border: '1px solid rgba(0, 0, 0, 0.23)'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10,
      cursor: 'pointer',
      opacity: 0.6
    },
    divider: {
      height: 28,
      margin: 4
    },
    flag: {
      fontSize: '38px'
    },
    serchInput: {
      width: '100%',
      padding: 12
    },
    option: {
      margin: 12,
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center'
    },
    wrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
    inputAndPaperWrapper: {
      display: 'flex',
      flexDirection: 'column'
    },
    phoneTypography: {
      opacity: 0.6,
      margin: '14px 0'
    },
    inputPaper: {
      marginTop: 15,
      maxHeight: '300px',
      overflow: 'auto',
      maxWidth: '296px'
    },
    optionsWrapper: {
      margin: 12,
      display: 'flex',
      alignItems: 'center'
    },
    countryNameAndcodeTypo: {
      marginLeft: 20
    },
    noResult: {
      opacity: 0.6,
      margin: 12
    }
  })
)

const PhoneComponent = () => {
  const classes = useStyles()
  const formattedCountriesList = Object.keys(countries).map((key) => {
    countries[key]['sub_name'] = key
    return countries[key]
  })

  const [countriesList, setCountriesList] = useState([])
  const [openWidget, setOpenWidget] = useState(false)
  const [shouldShowNoResult, setShouldShowNoResult] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(
    formattedCountriesList[228]
  )
  const [searchTextFieldValue, setSerchTextFieldValue] = useState('')

  const handleSetSelectedCountry = (country) => {
    setSelectedCountry(country)
  }

  const handleOnChangeInput = (event) => {
    try {
      setSerchTextFieldValue(event.target.value)
      setShouldShowNoResult(true)

      if (event.target.value === '') {
        setShouldShowNoResult(false)
        setCountriesList([])
        return
      }
      const filteredQuestions =
        formattedCountriesList &&
        formattedCountriesList.length > 0 &&
        formattedCountriesList.filter(function (obj) {
          return (
            obj.code.toLowerCase().includes(event.target.value.toLowerCase()) ||
            obj.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
            obj.sub_name
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          )
        })

      setCountriesList(filteredQuestions)
    } catch {}
  }

  const handleTextFieldOnFoucs = () => {
    setOpenWidget(true)
  }

  const handleCloseWidget = () => {
    setOpenWidget(false)
  }

  const handleChangePhoneInput = (event) => {
    setShouldShowNoResult(false)
    setCountriesList([])
    setSerchTextFieldValue('')
  }

  return (
    <ClickAwayListener onClickAway={handleCloseWidget}>
      <div className={classes.inputAndPaperWrapper}>
        <Typography className={classes.phoneTypography}>Phone</Typography>
        <Paper
          onFocus={handleTextFieldOnFoucs}
          component='form'
          className={classes.paperRoot}
        >
          <Typography className={classes.iconButton} aria-label='menu'>
            {selectedCountry.code}
          </Typography>
          <InputBase
            className={classes.input}
            placeholder={PHONE_NUMBER_PLACE_HOLDER}
            onChange={handleChangePhoneInput}
          />
        </Paper>
        <Grow in={openWidget}>
          <Paper className={classes.inputPaper}>
            <div className={classes.optionsWrapper}>
              <ReactCountryFlag
                className={classes.flag}
                countryCode={selectedCountry.sub_name}
                svg
              />
              <Typography className={classes.countryNameAndcodeTypo}>
                {selectedCountry.name} ({selectedCountry.code})
              </Typography>
            </div>
            <InputBase
              className={classes.serchInput}
              placeholder={SEARCH_INPUT_PLEACE_HOLDER}
              onChange={handleOnChangeInput}
              value={searchTextFieldValue}
            />

            {Array.isArray(countriesList) && countriesList.length === 0 ? (
              <Fragment>
                {shouldShowNoResult && (
                  <Typography className={classes.noResult}>
                    {NO_RESULT}
                  </Typography>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {countriesList.map((country) => {
                  return (
                    <div key={country.code + country.name}>
                      <div
                        onClick={() => handleSetSelectedCountry(country)}
                        className={classes.option}
                      >
                        <ReactCountryFlag
                          className={classes.flag}
                          countryCode={country.sub_name}
                          svg
                        />
                        <Typography className={classes.countryNameAndcodeTypo}>
                          {country.name} ({country.code})
                        </Typography>
                      </div>
                    </div>
                  )
                })}
              </Fragment>
            )}
          </Paper>
        </Grow>
      </div>
    </ClickAwayListener>
  )
}

export default PhoneComponent
