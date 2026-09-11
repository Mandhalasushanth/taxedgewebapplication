import React from 'react'
import {
  HomeIcon,
  BuildingIcon,
  PinIcon,
  MapIcon,
  PlusIcon,
} from '../RegistrationIcons/RegistrationIcons'
import { RegistrationSelect } from '../RegistrationSelect/RegistrationSelect'
import './RegistrationAddressFields.css'

const ALL_INDIAN_STATES_UTS = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
] as const

export interface RegistrationAddressValues {
  addressLine1: string
  addressLine2: string
  city: string
  pincode: string
  state: string
}

export interface RegistrationAddressErrors {
  addressLine1?: string
  addressLine2?: string
  city?: string
  pincode?: string
  state?: string
}

export interface RegistrationAddressFieldsProps {
  values: RegistrationAddressValues
  errors: RegistrationAddressErrors
  showLine2: boolean
  onToggleLine2: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export const RegistrationAddressFields: React.FC<RegistrationAddressFieldsProps> = ({
  values,
  errors,
  showLine2,
  onToggleLine2,
  onChange,
  onBlur,
}) => {
  return (
    <div className="reg-address-fields">
      {/* Row 5: Address Line 1 with + Add Line 2 */}
      <div className="reg-field">
        <div className="reg-address-fields__header-row">
          <label className="reg-field__label" htmlFor="reg-addressLine1">
            Address Line 1 <span className="reg-field__required">*</span>
          </label>
          {!showLine2 && (
            <button
              type="button"
              className="reg-address-fields__add-btn"
              onClick={onToggleLine2}
            >
              <PlusIcon size={12} color="#F97316" />
              <span>Add Line 2</span>
            </button>
          )}
        </div>
        <div className={`reg-field__control ${errors.addressLine1 ? 'reg-field__control--error' : ''}`}>
          <span className="reg-field__icon">
            <HomeIcon />
          </span>
          <input
            id="reg-addressLine1"
            name="addressLine1"
            type="text"
            className="reg-field__input"
            placeholder="House / Building / Street"
            value={values.addressLine1}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete="address-line1"
          />
        </div>
        {errors.addressLine1 && <p className="reg-field__error">{errors.addressLine1}</p>}
      </div>

      {/* Dynamic Address Line 2 */}
      {showLine2 && (
        <div className="reg-field reg-address-fields__dynamic-line2">
          <label className="reg-field__label" htmlFor="reg-addressLine2">
            Address Line 2 (Optional)
          </label>
          <div className="reg-field__control">
            <span className="reg-field__icon">
              <HomeIcon />
            </span>
            <input
              id="reg-addressLine2"
              name="addressLine2"
              type="text"
              className="reg-field__input"
              placeholder="Enter Landmark, Locality"
              value={values.addressLine2}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete="address-line2"
            />
          </div>
        </div>
      )}

      {/* Row 6: Three Columns: City, PIN Code, State / UT */}
      <div className="reg-address-fields__three-col">
        <div className="reg-field">
          <label className="reg-field__label" htmlFor="reg-city">
            City <span className="reg-field__required">*</span>
          </label>
          <div className={`reg-field__control ${errors.city ? 'reg-field__control--error' : ''}`}>
            <span className="reg-field__icon">
              <BuildingIcon />
            </span>
            <input
              id="reg-city"
              name="city"
              type="text"
              className="reg-field__input"
              placeholder="Enter city"
              value={values.city}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete="address-level2"
            />
          </div>
          {errors.city && <p className="reg-field__error">{errors.city}</p>}
        </div>

        <div className="reg-field">
          <label className="reg-field__label" htmlFor="reg-pincode">
            PIN Code <span className="reg-field__required">*</span>
          </label>
          <div className={`reg-field__control ${errors.pincode ? 'reg-field__control--error' : ''}`}>
            <span className="reg-field__icon">
              <PinIcon />
            </span>
            <input
              id="reg-pincode"
              name="pincode"
              type="text"
              inputMode="numeric"
              className="reg-field__input"
              placeholder="Enter pincode"
              maxLength={6}
              value={values.pincode}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete="postal-code"
            />
          </div>
          {errors.pincode && <p className="reg-field__error">{errors.pincode}</p>}
        </div>

        <div className="reg-field">
          <label className="reg-field__label" htmlFor="reg-state">
            State / UT <span className="reg-field__required">*</span>
          </label>
          <RegistrationSelect
            id="reg-state"
            name="state"
            value={values.state}
            placeholder="Select your State"
            options={ALL_INDIAN_STATES_UTS}
            icon={<MapIcon />}
            hasError={Boolean(errors.state)}
            align="right"
            searchable={true}
            onChange={onChange}
          />
          {errors.state && <p className="reg-field__error">{errors.state}</p>}
        </div>
      </div>
    </div>
  )
}
