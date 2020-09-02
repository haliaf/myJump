import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-face-book-register',
  templateUrl: './face-book-register.component.html',
  styleUrls: ['./face-book-register.component.scss']
})
export class FaceBookRegisterComponent implements OnInit {
  private authWindow: Window;
  failed: boolean;
  error: string;
  errorDescription: string;
  isRequesting: boolean;

  launchFbLogin() {
    this.authWindow = window.open('https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&client_id=316545856243815&display=popup&redirect_uri=http://localhost:5000/facebook-auth.html&scope=email',null,'width=600,height=400');
  }

  constructor(private authService: AuthService) {
    if (window.addEventListener) {
      window.addEventListener('message', this.handleMessage.bind(this), false);
    } else {
       (window as any).attachEvent('onmessage', this.handleMessage.bind(this));
    }
   }

  ngOnInit() {
  }
  handleMessage(event: Event) {
    const message = event as MessageEvent;
    // Only trust messages from the below origin.
    if (message.origin !== 'http://localhost:8080') { return; }

    this.authWindow.close();

    const result = JSON.parse(message.data);
    if (!result.status)
    {
      this.failed = true;
      this.error = result.error;
      this.errorDescription = result.errorDescription;
    }
    else
    {
      this.failed = false;
      this.isRequesting = true;

      this.authService.facebookLogin(result.accessToken);
    }
  }

}
