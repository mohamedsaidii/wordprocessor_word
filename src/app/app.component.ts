import { Component, ViewChild } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { TitleBar } from './title-bar';
import { isNullOrUndefined } from '@syncfusion/ej2-base';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToolbarService]
})
export class AppComponent {
   //Gets the DocumentEditorContainerComponent instance from view DOM using a template reference variable 'documenteditor_ref'.
   @ViewChild('documenteditor_ref') public container! : DocumentEditorContainerComponent;
   titleBar: TitleBar;
  public serviceLink: string;
  title = 'wordprocesor';
    constructor() {
    this.serviceLink = 'http://localhost:6002/api/documenteditor/';
  }
  onCreate(): void {
    let titleBarElement: HTMLElement = document.getElementById('default_title_bar');
    this.titleBar = new TitleBar(titleBarElement, this.container.documentEditor, true,true);
    this.container.documentEditor.documentName = 'Welcome To Aosora';
    this.titleBar.updateDocumentTitle();
    //Sets the language id as EN_US (1033) for spellchecker and docker image includes this language dictionary by default.
    //The spellchecker ensures the document content against this language.
    this.container.documentEditor.spellChecker.languageID = 1033;
    setInterval(()=>{
      this.updateDocumentEditorSize();
    }, 100);
    //Adds event listener for browser window resize event.
    window.addEventListener("resize", this.onWindowResize);

  }
  
  onDocumentChange(): void {
    if (!isNullOrUndefined(this.titleBar)) {
        this.titleBar.updateDocumentTitle();
    }
    this.container.documentEditor.focusIn();
  }
  onDestroy(): void {
    //Removes event listener for browser window resize event.
    window.removeEventListener("resize", this.onWindowResize);
  }
  
  onWindowResize= (): void => {
    //Resizes the document editor component to fit full browser window automatically whenever the browser resized.
    this.updateDocumentEditorSize();
  }
  
  updateDocumentEditorSize(): void {
    //Resizes the document editor component to fit full browser window.
    var windowWidth = window.innerWidth;
    //Reducing the size of title bar, to fit Document editor component in remaining height.
    var windowHeight = window.innerHeight - this.titleBar.getHeight();
    this.container.resize(windowWidth, windowHeight);
  } 
}
