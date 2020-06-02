// import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';

// @Component({
//     selector: 'qrcode-root',
//     templateUrl: './qrcode.component.html'
// })
// export class QrCodeComponent {
//     title = 'read-qrcodes-angular7';
//     elementType = 'url';
//     public imagePath;
//     value: any;
//     @ViewChild('result') resultElement: ElementRef;
//     showQRCode: boolean = false;
//     constructor(private renderer: Renderer2) {
//     }
//     preview(files) {
//         if (files.length === 0)
//             return;
//         let mimeType = files[0].type;
//         if (mimeType.match(/image\/*/) == null) {
//             alert("Only images are supported.");
//             return;
//         }
//         let reader = new FileReader();
//         reader.readAsDataURL(files[0]);
//         reader.onload = (_event: any) => {
//             this.value = reader.result;
//             console.log(reader.result);
//             this.showQRCode = true;
//         }
//     }
//     render(e: any) {
//         const element: Element = this.renderer.createElement('h1');
//         element.innerHTML = e.result;
//         this.renderElement(element);
//     }

//     renderElement(element) {
//         for (let node of this.resultElement.nativeElement.childNodes) {
//             this.renderer.removeChild(this.resultElement.nativeElement, node);
//         }
//         this.renderer.appendChild(this.resultElement.nativeElement, element);
//     }
// }