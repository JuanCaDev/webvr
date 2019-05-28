export interface Teacher {
  uid: string;
  doc: number;
  name: string;
  email: string;
  students?: any;
  coordinator?: number;
}
