export interface Customer{
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    optInNewsletter: boolean;
    type: CustomerType;
    preferredContactMethod: InteractionMethod;
    lastContactDate: string;
    status: string;
}
export type InteractionMethod = 'phone' | 'email';
export type CustomerType = 'none' | 'email' |'phone'
