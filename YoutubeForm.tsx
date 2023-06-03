import React, { useEffect } from 'react'
import { useForm,useFieldArray, FieldErrors } from 'react-hook-form';
import '../assets/YoutubeForm.css';
import {DevTool} from '@hookform/devtools';
export const YoutubeForm = () => {
  interface formType  {
    username:String,
    email:String,
    channel:String,
    age:Number,
    dob:String,
    social:{
      twitter:String,
      facebook:String
    },
    phoneNumber:string[],
    phNumber:{
      number:String
       }[]
  }
  const channelForm = useForm<formType>({
    defaultValues:{
      username:'bilal shah',
      email:'',
      channel:'',
      age:0,
      dob:'',
      social:{
        twitter:'',
        facebook:''
      },
      phoneNumber:["",""],
      phNumber:[{number:''}]
    }
  });

const {register,control, handleSubmit,formState , getValues,setValue,reset} = channelForm;
console.log("formState---",formState);
const {errors,dirtyFields,touchedFields, isDirty , isValid, isSubmitSuccessful} = formState;

useEffect(()=>{
  if(isSubmitSuccessful){
    reset();
  }
},[isSubmitSuccessful])

const {fields,append,remove} = useFieldArray({
  name:"phNumber",
  control
});
function submit(data:formType):void {
  console.log('values' ,data);
}
function getHandle() {
 const values = getValues();
 console.log("values",values);
}

function setValuesHandle() {
  setValue("username","",{
    shouldValidate:true,
    shouldDirty:true,
    shouldTouch:true
  });
}

const onError=(error:FieldErrors<formType>)=>{
  console.log("error--",error);
}
  return (
    <div className='main'>
        <form className='form' onSubmit={handleSubmit(submit,onError)} noValidate>
          <div className='input-box'>
            {/* username input */}
          <label htmlFor='username'>username</label>
          <input type='text' id="username"  {...register('username',{
            required:{
              value:true,
              message:'username is required'
            }
          })}
          />
        {errors.username?.message && <p className='error'>{errors.username?.message}</p>}
            </div>
        {/* email input  */}
         <div className='input-box'>
         <label htmlFor='email'>Email </label>
        <input type='text' id="email" {...register('email',{
          required:"email is required",
            pattern:{
            value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            message:"Please enter valid email"
          },
          validate:{
            notAdmin:(fieldValue) => {
              return (
                fieldValue !== 'admin@gmail.com' || 'please add different email'
              )
            },
            isBlockListed:(fieldValue)=>{
              return (
                !fieldValue.endsWith('yahooBaba.net') || "This domain is not allowed"
              )
            },
            emailAvailable:async(fieldValue)=>{
            console.log(fieldValue);
            return true;
            } 
          }
          
        })}/>
            {errors.email?.message && <p className='error'>{errors.email?.message}</p>}
         </div>
         {/* channel input start here */}
          <div className='input-box'>
          <label htmlFor='channel'> channel </label>
          <input type='text' id="channel" {...register('channel',{
          required:'channel is required'
          })}/>
               {errors.channel?.message && <p className='error'>{errors.channel?.message}</p>}
          </div>
          <div className='input-box'>
          <label htmlFor='age'> age </label>
          <input type='number' id="age" {...register('age',{
          required:'age is required'
          })}/>
          {errors.age && <p className='error'>{errors.age?.message}</p>}
          </div>
          <div className='input-box'>
          <label htmlFor='Date'> Date </label>
          <input type='date' id="date" {...register('dob',{
            valueAsDate:true,
          required:'date is required'
          })}/>
               {errors.dob && <p className='error'>{errors.dob?.message}</p>}
          </div>
          <div className='input-box'>
          <label htmlFor='twitter'> twitter </label>
        <input type='text' id="twitter" {...register('social.twitter',{
          required:'twitter is required',
        })}/>
               {errors.social?.twitter && <p className='error'>{errors.social.twitter?.message}</p>}
          </div>
          <div className='input-box'>
          <label htmlFor='facebook'> facebook </label>
        <input type='text' id="facebook" {...register('social.facebook',{
          required:'facebook is required',
        })}/>
               {errors.social?.facebook && <p className='error'>{errors.social.facebook?.message}</p>}
          </div>
         {/* phone number start here */}
         <div className='input-box'>
          <label htmlFor='facebook'> Primary Phone number </label>
        <input type='text' id="facebook" {...register('phoneNumber.0',{
          required:'Phone number is required',
        })}/>
               {errors?.phoneNumber && <p className='error'>{errors.phoneNumber?.[0]?.message}</p>}
          </div>
          <div className='input-box'>
          <label htmlFor='facebook'> Secondary Phone number </label>
        <input type='number' id="facebook" {...register('phoneNumber.1')}/>
               {errors?.phoneNumber && <p className='error'>{errors.phoneNumber?.[1]?.message}</p>}
          </div>

          {/* add dynamic fields here */}
          <div className='input-box'>
            <span>List of Phone numbers:</span>
            {
              fields.map((field, index) => {
                return (
                  <div className="form-control" key={field.id} style={{display:"flex",justifyContent:"space-between",alignItems:'center'}}>
                  <input
                  type="number" {...register(`phNumber.${index}.number` as const)}
                  /> 
                  <button onClick={()=> remove(index)}>Remove</button>
                  </div>
                )
              })
            }
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <button onClick={() => {append({number:''}) }} >Add phone number</button>
          <button type='submit' disabled={!isDirty || !isValid}>Submit</button>
          </div>
        </form>
        <button onClick={getHandle}>Get Values</button>
        <button onClick={setValuesHandle}>set Values</button>
        <DevTool control={control}/>
    </div>
  )
}
