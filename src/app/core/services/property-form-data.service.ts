import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class PropertyFormDataService {

  private Key = 'propertyFormData'
  
  private roomImages: File[] = []; 
  private thumbnail: any; 

  constructor() {
    this.initializeFormData()
  }

  private initializeFormData() {
    if (!localStorage.getItem(this.Key)) {
      localStorage.setItem(
        this.Key,
        JSON.stringify({ page1: {}, page2: {}, page3: {} })
      )
    }
  }
  updateFormData(page: string, data: any) {
    const formData = this.getFormData()
    formData[page] = data
    localStorage.setItem(this.Key, JSON.stringify(formData))
  }


  getFormData(): any {
    return JSON.parse(localStorage.getItem(this.Key) || '{}')
  }

  resetFormData() {
    localStorage.removeItem(this.Key)
    this.initializeFormData()
  }

  setRoomImage(index: number, file: File) {
    this.roomImages[index] = file;
  }

  getRoomImage(index: number): File | null {
    return this.roomImages[index] || null;
  }
  
  setThumbnail(file: File) {
    this.thumbnail = file;
  }

  getThumbnail(): File | null {
    return this.thumbnail || null;
  }

  // getRoomImage(index: number): File | null {
  //   const storedImage = localStorage.getItem(`roomImage_${index}`);
  //   if (!storedImage) return null; // If no image, return null
  
  //   try {
  //     const blob = this.base64ToBlob(storedImage);
  //     return new File([blob], `roomImage_${index}.jpg`, { type: "image/jpeg" });
  //   } catch (error) {
  //     console.error("Error converting image:", error);
  //     return null;
  //   }
  // }
  
  // // Convert Base64 to Blob
  // base64ToBlob(base64: string): Blob {
  //   const byteCharacters = atob(base64.split(",")[1]);
  //   const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
  //   return new Blob([new Uint8Array(byteNumbers)], { type: "image/jpeg" });
  // }  

  getAllRoomImages(): File[] {
    return this.roomImages;
  }
}
