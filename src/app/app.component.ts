import { Component, OnInit } from '@angular/core';
import { SplitFactory } from '@splitsoftware/splitio';
import { splitioKey } from '../../secrets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'featureFlag';

  enableElectricCurtain: boolean;
  brewCoffee: boolean;

  constructor() {}

  ngOnInit() {
    const factory = SplitFactory({
      core: {
        authorizationKey: splitioKey,
        key: 'CUSTOMER_ID'
     }
    });

    const client = factory.client();

    client.on(client.Event.SDK_READY, () => {
      const brew = client.getTreatment('brew-coffee');
      if (brew) {
        this.brewCoffee = true;
      } else {
        this.brewCoffee = false;
      }

    });
  }
}
