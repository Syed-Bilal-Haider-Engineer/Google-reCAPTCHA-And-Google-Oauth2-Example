import  { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
import './style/Form.css';
import { DevTool } from '@hookform/devtools';
import ReCAPTCHA from 'react-google-recaptcha';
import { FormType } from './types/Formtype'
import axios from 'axios';
export const Form: React.FC = () => {
  const secrete_site_key = '6LclsBQqAAAAALa0tVW0_MhUWEbMIYGlSGY2nhFt';
  const [valueReCapcha,setValueReCapcha] = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const channelForm = useForm<FormType>({
    defaultValues: {
      username: '',
      email: '',
      channel: '',
      age: 0,
      dob: '',
      social: {
        twitter: '',
        facebook: '',
      },
      phoneNumber: ['', ''],
      phNumber: [{number: ''}],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    reset,
  } = channelForm;
  const {errors, isDirty, isValid, isSubmitSuccessful} = formState;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const {fields, append, remove} = useFieldArray({
    name: 'phNumber',
    control,
  });

  async function submit(formValues: FormType): Promise<void> {
    try {
      recaptchaRef?.current?.reset();
  
      const response = await axios.post('http://localhost:4001/api/users/create', {
        ...formValues,
        valueReCapcha,
      });
    if(response.status === 200){
      alert('User created successfully!');
    }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      alert(errorMessage);
    }
  }

  const onError = (error: FieldErrors<FormType>) => {
    console.log('error--', error);
  };

  function onChange(value: any) {
    setValueReCapcha(value)
  }

  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        style={{
          width: '90%',
          minHeight: '450px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: 'lightgray',
          gap: '5px',
          padding: '5px 0px',
        }}
        onSubmit={handleSubmit(submit, onError)}
        noValidate
      >
        <div style={{width: '70%', margin: 'auto'}}>
          <label
            htmlFor="username"
            style={{
              textAlign: 'left',
              color: 'white',
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              fontWeight: 700,
            }}
          >
            username
          </label>
          <input
            type="text"
            id="username"
            {...register('username', {
              required: {
                value: true,
                message: 'username is required',
              },
            })}
            style={{
              width: '100%',
              borderRadius: '2px',
              border: '0.5px solid white',
            }}
          />
          {errors.username?.message && (
            <p style={{color: 'red', fontSize: '12px', textAlign: 'left'}}>
              {errors.username?.message}
            </p>
          )}
        </div>

        <div style={{width: '70%', margin: 'auto'}}>
          <label
            htmlFor="email"
            style={{
              textAlign: 'left',
              color: 'white',
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              fontWeight: 700,
            }}
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register('email', {
              required: 'email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'Please enter valid email',
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== 'admin@gmail.com' ||
                    'please add different email'
                  );
                },
                isBlockListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith('yahooBaba.net') ||
                    'This domain is not allowed'
                  );
                },
                emailAvailable: async (fieldValue) => {
                  console.log(fieldValue);
                  return true;
                },
              },
            })}
            style={{
              width: '100%',
              borderRadius: '2px',
              border: '0.5px solid white',
            }}
          />
          {errors.email?.message && (
            <p style={{color: 'red', fontSize: '12px', textAlign: 'left'}}>
              {errors.email?.message}
            </p>
          )}
        </div>

        <div style={{width: '70%', margin: 'auto'}}>
          <label
            htmlFor="channel"
            style={{
              textAlign: 'left',
              color: 'white',
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              fontWeight: 700,
            }}
          >
            channel
          </label>
          <input
            type="text"
            id="channel"
            {...register('channel', {
              required: 'channel is required',
            })}
            style={{
              width: '100%',
              borderRadius: '2px',
              border: '0.5px solid white',
            }}
          />
          {errors.channel?.message && (
            <p style={{color: 'red', fontSize: '12px', textAlign: 'left'}}>
              {errors.channel?.message}
            </p>
          )}
        </div>

        <div style={{width: '70%', margin: 'auto'}}>
          <label
            htmlFor="age"
            style={{
              textAlign: 'left',
              color: 'white',
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              fontWeight: 700,
            }}
          >
            age
          </label>
          <input
            type="number"
            id="age"
            {...register('age', {
              required: 'age is required',
            })}
            style={{
              width: '100%',
              borderRadius: '2px',
              border: '0.5px solid white',
            }}
          />
          {errors.age && (
            <p style={{color: 'red', fontSize: '12px', textAlign: 'left'}}>
              {errors.age?.message}
            </p>
          )}
        </div>

        <div style={{width: '70%', margin: 'auto'}}>
          <label
            htmlFor="date"
            style={{
              textAlign: 'left',
              color: 'white',
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              fontWeight: 700,
            }}
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register('dob', {
              valueAsDate: true,
              required: 'date is required',
            })}
            style={{
              width: '100%',
              borderRadius: '2px',
              border: '0.5px solid white',
            }}
          />
          {errors.dob && (
            <p style={{color: 'red', fontSize: '12px', textAlign: 'left'}}>
              {errors.dob?.message}
            </p>
          )}
        </div>

        <div style={{width: '70%', margin: 'auto'}}>
          <label
            htmlFor="twitter"
            style={{
              textAlign: 'left',
              color: 'white',
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              fontWeight: 700,
            }}
          >
            twitter
          </label>
          <input
            type="text"
            id="twitter"
            {...register('social.twitter', {
              required: 'twitter is required',
            })}
            style={{
              width: '100%',
              borderRadius: '2px',
              border: '0.5px solid white',
            }}
          />
          {errors.social?.twitter && (
            <p style={{color: 'red', fontSize: '12px', textAlign: 'left'}}>
              {errors.social.twitter?.message}
            </p>
          )}
        </div>

        <div style={{width: '70%', margin: 'auto'}}>
          <label
            htmlFor="facebook"
            style={{
              textAlign: 'left',
              color: 'white',
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              fontWeight: 700,
            }}
          >
            facebook
          </label>
          <input
            type="text"
            id="facebook"
            {...register('social.facebook', {
              required: 'facebook is required',
            })}
            style={{
              width: '100%',
              borderRadius: '2px',
              border: '0.5px solid white',
            }}
          />
          {errors.social?.facebook && (
            <p style={{color: 'red', fontSize: '12px', textAlign: 'left'}}>
              {errors.social.facebook?.message}
            </p>
          )}
        </div>
        <div className="input-box">
          <label htmlFor="facebook"> Primary Phone number </label>
          <input
            type="text"
            id="facebook"
            {...register('phoneNumber.0', {
              required: 'Phone number is required',
            })}
          />
          {errors?.phoneNumber && (
            <p className="error">{errors.phoneNumber?.[0]?.message}</p>
          )}
        </div>
        <div className="input-box" style={{width: '70%', margin: 'auto'}}>
          <label htmlFor="facebook"> Secondary Phone number </label>
          <input
            type="number"
            id="facebook"
            {...register('phoneNumber.1')}
            style={{
              width: '100%',
              borderRadius: '2px',
              border: ' 0.5px solid white',
            }}
          />
          {errors?.phoneNumber && (
            <p className="error">{errors.phoneNumber?.[1]?.message}</p>
          )}
        </div>
        <div className="input-box" style={{width: '70%', margin: 'auto'}}>
          <label>List of Phone numbers:</label>
          {fields.map((field, index) => {
            return (
              <div
                className="form-control"
                key={field.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '5px',
                }}
              >
                <input
                  type="number"
                  {...register(`phNumber.${index}.number` as const)}
                />
                <button
                  type="button"
                  style={{
                    width: '100px',
                    height: '22px',
                    padding: '5px',
                    border: 'none',
                  }}
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <ReCAPTCHA
          style={{display: 'inline-block'}}
          sitekey={secrete_site_key}
          onChange={onChange}
          ref={recaptchaRef}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            style={{width: '100px', height: '40px', padding: '5px'}}
            onClick={() => append({number: ''})}
          >
            Add phone number
          </button>
          <button
            type="submit"
            style={{width: '100px', height: '40px', padding: '5px'}}
            disabled={!isDirty || !isValid}
          >
            Submit
          </button>
        </div>
        <DevTool control={control} />
      </form>
    </div>
  );
};
