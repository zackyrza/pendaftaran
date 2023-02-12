export interface IStep2Props {
    registrationId: number;
    onSuccessfulSubmit: (city: string, candidatesName: string[], photo: string[], status: string[]) => void;
}