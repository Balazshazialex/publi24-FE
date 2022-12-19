import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies=[];
  searchTextId='';
  highlightCompanyById='';
  searchTextIsin='';
  highlightCompanyByIsin='';
  addCompanyForm: companyForm = new companyForm();
  updateCompanyForm: updateCompanyForm = new updateCompanyForm();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllCompanies();
  }

  public getAllCompanies(){
    this.http.get("https://localhost:44331/api/company")
    .subscribe({
      next: (result: any) => this.companies = result,
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }
  public searchById(){
    this.http.get(`https://localhost:44331/api/company/${this.searchTextId}`)
    .subscribe({
      next: (result: any) =>  this.highlightCompanyById =`${result.name}-${result.exchange}-${result.ticker}-${result.isin}-${result.website}`,
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  public searchByIsin(){
    this.http.get(`https://localhost:44331/api/company/isin/${this.searchTextIsin}`)
    .subscribe({
      next: (result: any) =>  {
        this.highlightCompanyByIsin = `${result.name}-${result.exchange}-${result.ticker}-${result.isin}-${result.website}`;
       console.log(this.highlightCompanyByIsin)},
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  public AddCompany(){
    this.http.post("https://localhost:44331/api/company", this.addCompanyForm).subscribe(async data => {
      this.getAllCompanies();
      })
    }

    public UpdateCompany(){
      this.http.put("https://localhost:44331/api/company", this.updateCompanyForm).subscribe(async data => {
        this.getAllCompanies();
        })
      }
}


export class companyForm {
  Name: string = "";
  Exchange: string = "";
  Ticker: string = "";
  Isin: string = "";
  Website: string = "";
}

export class updateCompanyForm {
  Id: string = "0";
  Name: string = "";
  Exchange: string = "";
  Ticker: string = "";
  Isin: string = "";
  Website: string = "";
}