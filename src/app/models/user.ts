export class User {
  name: string;
  city: string;
  email: string;
  zipcode: string;
  website: string;

  constructor(response: any) {
    this.name = response.name;
    this.city = response.address.city;
    this.email = response.email;
    this.website = response.website;
    this.zipcode = response.address.zipcode;
  }
}
