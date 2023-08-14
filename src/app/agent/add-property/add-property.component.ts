import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/service/global.service';
interface statesInIndia {
  state: string;
  code: string;
}
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
  providers: [MessageService]
})

export class AddPropertyComponent {
  @ViewChild('imgInput')
  imgInputVariable!: ElementRef;
  file: any;
  categoriesArray: any = [];
  id: any;


  statesInIndia: any = []
  agentId: any
  description: any
  propertyName: any
  state: any
  image: any
  category: any
  price: any
  control: any;
  propertiesArray: any = []
  property_Id: any;
  type:any

  constructor(private fb: FormBuilder, private router: Router, public global: GlobalService, private messageService: MessageService) {
    this.statesInIndia = [
      { state: 'Andhra Pradesh', code: 'AP' },
      { state: 'Arunachal Pradesh', code: 'AR' },
      { state: 'Assam', code: 'AS' },
      { state: 'Bihar', code: 'BR' },
      { state: 'Chhattisgarh', code: 'CT' },
      { state: 'Goa', code: 'GA' },
      { state: 'Gujarat', code: 'GJ' },
      { state: 'Haryana', code: 'HR' },
      { state: 'Himachal Pradesh', code: 'HP' },
      { state: 'Jharkhand', code: 'JH' },
      { state: 'Karnataka', code: 'KA' },
      { state: 'Kerala', code: 'KL' },
      { state: 'Madhya Pradesh', code: 'MP' },
      { state: 'Maharashtra', code: 'MH' },
      { state: 'Manipur', code: 'MN' },
      { state: 'Meghalaya', code: 'ML' },
      { state: 'Mizoram', code: 'MZ' },
      { state: 'Nagaland', code: 'NL' },
      { state: 'Odisha', code: 'OR' },
      { state: 'Punjab', code: 'PB' },
      { state: 'Rajasthan', code: 'RJ' },
      { state: 'Sikkim', code: 'SK' },
      { state: 'Tamil Nadu', code: 'TN' },
      { state: 'Telangana', code: 'TG' },
      { state: 'Tripura', code: 'TR' },
      { state: 'Uttar Pradesh', code: 'UP' },
      { state: 'Uttarakhand', code: 'UT' },
      { state: 'West Bengal', code: 'WB' },
      { state: 'Andaman and Nicobar Islands', code: 'AN' },
      { state: 'Chandigarh', code: 'CH' },
      { state: 'Dadra and Nagar Haveli and Daman and Diu', code: 'DNDD' },
      { state: 'Delhi', code: 'DL' },
      { state: 'Lakshadweep', code: 'LD' },
      { state: 'Puducherry', code: 'PY' }
    ];

  }

  imageExtensionsArray: any = ['apng', 'jpg', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp']


  addPropertyForm = this.fb.group({
    propertyName: ["", Validators.required],
    description: ["", Validators.required],
    state: ["", Validators.required],
    type: ["", Validators.required],
    category: ["", Validators.required],
    price: ["", Validators.required],
  })

  updatePropertyForm = this.fb.group({
    propertyName: ["", Validators.required],
    description: ["", Validators.required],
    state: ["", Validators.required],
    type: ["", Validators.required],
    category: ["", Validators.required],
    price: ["", Validators.required],
  })



  ngOnInit(): void {
    this.agentId = sessionStorage.getItem('agentId')

    console.log(this.agentId);
    this.getPropertiesList()

    // this.getAllCategories()

  }

  getData(item: any) {
    console.log(item);
    this.property_Id = item.propertyId
    this.updatePropertyForm.patchValue(item)
  }

  logout() {
    sessionStorage.clear()
    // this.messageService.clear()
    // this.messageService.add({ severity: 'success', summary: 'Logout Succesfull!' });
    setTimeout(() => {
      this.router.navigate(['/']).then(() => window.location.reload())
    }, 500);
  }

  removeCategory() {
    let passData = {
      id: this.id
    }
    this.global.postUnauthenticateData(this.global.basepath + '/deleteCategory', passData).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        this.getAllCategories()
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: 'Category Deleted Succesfully!' });
      }
      else {
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: 'Unable To Delete Category!' });
      }
    })
  }


  // imgUploadInput(event: any) {
  //   let file = event.target.files[0]
  //   let file_extension = file.name.split('.').pop();
  //   if (this.imageExtensionsArray.includes(file_extension)) {
  //     this.file = file
  //     console.log(this.file);
  //   }
  //   else {
  //     this.imgInputVariable.nativeElement.value = '';
  //   }
  // }

  getAllCategories() {
    let passdata = {
      pageNo: String(0)
    }
    this.global.postUnauthenticateData(this.global.basepath + '/getAllCategory', passdata).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        this.categoriesArray = res.data

      }
    })
  }

  addProperty() {
    this.propertyName = this.addPropertyForm.controls['propertyName'].value;
    this.description = this.addPropertyForm.controls['description'].value;
    this.state = this.addPropertyForm.controls['state'].value;
    this.type = this.addPropertyForm.controls['type'].value;
    this.category = this.addPropertyForm.controls['category'].value;
    this.price = this.addPropertyForm.controls['price'].value;

    let passData = {
      propertyName: this.propertyName,
      state: this.state,
      type: this.type,
      category: this.category,
      price: this.price,
      description: this.description,
      agentId: this.agentId
    }
    console.log(passData);


    this.global.postUnauthenticateData(this.global.basepath + '/agent/add-property', passData).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        this.addPropertyForm.reset()
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: 'Property Added Succesfully!' });
        this.getPropertiesList()
      }
    })
  }

  updateProperty() {
    this.propertyName = this.updatePropertyForm.controls['propertyName'].value;
    this.description = this.updatePropertyForm.controls['description'].value;
    this.state = this.updatePropertyForm.controls['state'].value;
    this.type = this.updatePropertyForm.controls['type'].value;
    this.category = this.updatePropertyForm.controls['category'].value;
    this.price = this.updatePropertyForm.controls['price'].value;

    let passData = {
      propertyId: this.property_Id,
      propertyName: this.propertyName,
      state: this.state,
      type: this.type,
      category: this.category,
      price: this.price,
      description: this.description,
    }

    this.global.postUnauthenticateData(this.global.basepath + '/agent/update-property', passData).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: 'Property Upated Succesfully!' });
        this.getPropertiesList()
      }
    })
  }

  deleteProperty(){
    let passData = {
      propertyId:this.property_Id
    }
    this.global.postUnauthenticateData(this.global.basepath+'/agent/deleteProperty', passData).subscribe((res:any)=>{
      console.log(res);
      if (res.success) {
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: 'Property Removed Succesfully!' });
        this.getPropertiesList()
      }
    })
  }
  
  getPropertiesList() {
    this.global.getUnAuthenticateData(this.global.basepath + '/agent/getAllProperties').subscribe((res: any) => {
      console.log(res);
      this.propertiesArray = res.propertiesList

    })
  }


  // addProperty() {
  //   let formData = new FormData()


  //   // if (this.addPropertyForm.controls['propertyName'].value !== null) {
  //   //   formData.append('propertyName', this.addPropertyForm.controls['propertyName'].value);
  //   //   console.log("jjj");

  //   // }
  //  
  //   // formData.append('file', this.file)

  //   // this.global.postUnauthenticateData(this.global.basepath + '/addCategory', formData).subscribe((res: any) => {
  //   //   if (res.success) {
  //   //     console.log(res);
  //   //     this.getAllCategories()
  //   //     this.addPropertyForm.reset()
  //   //     this.messageService.clear()
  //   //     this.messageService.add({ severity: 'success', summary: 'Category Added Succesfully!' });
  //   //   }
  //   //   else {
  //   //     this.messageService.clear()
  //   //     this.messageService.add({ severity: 'error', summary: 'Unable To Add Category!' });
  //   //   }
  //   // })
  // }


  updateCategory() {
    let formData = new FormData()
    // formData.append('categoryName', this.updateCategoryForm.controls['categoryName'].value)
    formData.append('id', this.id)

    this.global.postUnauthenticateData(this.global.basepath + '/updateCategory', formData).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        this.getAllCategories()
        this.messageService.clear()
        this.messageService.add({ severity: 'success', summary: 'Category Updated Succesfully!' });
      }
      else {
        this.messageService.clear()
        this.messageService.add({ severity: 'error', summary: 'Unable To Update Category!' });
      }
    })
  }

  // disableSubmitBtn() {
  //   if (this.addCategoryForm.valid) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }

}
