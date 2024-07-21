export interface FormType {
    username: string;
    email: string;
    channel: string;
    age: number;
    dob: string;
    social: {
      twitter: string;
      facebook: string;
    };
    phoneNumber: string[];
    phNumber: {
      number: string;
    }[];
  }
  