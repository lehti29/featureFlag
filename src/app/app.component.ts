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
  bar: string;
  desc: string;
  edit: string;

  constructor() {}

  ngOnInit() {
    const factory = SplitFactory({
      core: {
        authorizationKey: splitioKey,
        key: 'Publisher2',
        trafficType: 'role'
     }
    });

    const client = factory.client();

    client.on(client.Event.SDK_READY, () => {
      this.brewCoffee = client.getTreatment('feature') === 'on';
      const x = client.getTreatment('best_bar');
      if (x === 'mitm') {
        this.bar = 'Man in The Moon';
        this.desc = 'God IPA';
      } else if (x === 'grodan') {
        this.bar = 'Grodan';
        this.desc = 'Moretti på fat!';
      } else if (x === 'erlands') {
        this.bar = 'Erlands';
        this.desc = 'Bees Knee`s från himmelen';
      } else {
        this.bar = 'Dovas';
        this.desc = 'Gå ej hit';
      }
      this.edit = client.getTreatment('edit_button');
      console.log(this.edit);
    });
  }
}
