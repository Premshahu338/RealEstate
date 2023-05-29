import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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


  statesInIndia:any = []

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


addCategoryForm = this.fb.group({
  categoryName: ["", Validators.required],
  file: ["", Validators.required]
})

updateCategoryForm = this.fb.group({
  categoryName: ["", Validators.required],
  file: ["", Validators.required]
})


ngOnInit(): void {
  // this.getAllCategories()

}

getData(item: any) {
  this.id = item.id
  console.log(item);
  this.updateCategoryForm.patchValue(item)
  console.log(this.updateCategoryForm);

}

logout() {
  sessionStorage.clear()
  // this.messageService.clear()
  // this.messageService.add({ severity: 'success', summary: 'Logout Succesfull!' });
  setTimeout(() => {
    this.router.navigate(['/']).then(() => window.location.reload())
  }, 500);
}

removeCategory(){
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


imgUploadInput(event: any) {
  let file = event.target.files[0]
  console.log(file);
  let file_extension = file.name.split('.').pop();
  if (this.imageExtensionsArray.includes(file_extension)) {
    this.file = file
    console.log(this.file);
  }
  else {
    this.imgInputVariable.nativeElement.value = '';
  }
}

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

addCategory() {
  let formData = new FormData()
  // formData.append('categoryName', this.addCategoryForm.controls['categoryName'].value)
  formData.append('file', this.file)
  this.global.postUnauthenticateData(this.global.basepath + '/addCategory', formData).subscribe((res: any) => {
    if (res.success) {
      console.log(res);
      this.getAllCategories()
      this.addCategoryForm.reset()
      this.messageService.clear()
      this.messageService.add({ severity: 'success', summary: 'Category Added Succesfully!' });
    }
    else {
      this.messageService.clear()
      this.messageService.add({ severity: 'error', summary: 'Unable To Add Category!' });
    }
  })
}


updateCategory(){
  let formData = new FormData()
  // formData.append('categoryName', this.updateCategoryForm.controls['categoryName'].value)
  formData.append('file', this.file)
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

disableSubmitBtn() {
  if (this.addCategoryForm.valid) {
    return false
  } else {
    return true
  }
}

}
