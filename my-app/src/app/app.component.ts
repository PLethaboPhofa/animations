//https://stackoverflow.com/questions/64678768/how-can-i-make-a-curve-line-to-join-two-node-in-html-and-css#:~:text=Afterwards:,that%20path%20to%20the%20svg

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'my-app';
  connections2: Record<string, HTMLElement>[] = [];

  ngOnInit(): void {
    this.collectElements();
    this.connectElements();
  }

  collectElements() {
    let holders = document.getElementsByClassName('col1');
    let text = document.getElementsByClassName('text').item(0);

    for (let count = 0; count < holders.length; count++) {
      let holder = holders.item(count) as HTMLElement;
      this.connections2.push({
        start: holder,
        end: text as HTMLElement,
      });
    }
    this.connections2.push({
      start: document.getElementsByClassName('bulb').item(0) as HTMLElement,
      end: text as HTMLElement,
    });
    console.log(this.connections2);
  }

  connectElements() {
    let paths = document.getElementById('paths');
    let padding = 10;
    let bezierWeight = 0.5;
    let oldPaths = paths?.children || [];
    for (let a = oldPaths.length - 1; a >= 0; a--) {
      //paths?.removeChild(oldPaths[a]);
    }

    let x1, y1, x4, y4, dx, x2, x3, path, start, end;

    for (let a = 0; a < this.connections2?.length; a++) {
      start = this.connections2[a]?.['start'];
      end = this.connections2[a]?.['end'];

      x1 = start.offsetLeft + start.scrollWidth / 2 - padding;
      y1 = start.offsetTop + start.clientHeight / 2 - padding+30;
      x4 = end.offsetLeft + start.clientWidth / 2 - 450;
      y4 = end.offsetTop + start.clientHeight / 2 - padding + 30;
      dx = Math.abs(x4 - x1) * bezierWeight;

      if (x4 < x1) {
        x2 = x1 - dx;
        x3 = x4 + dx;
      } else {
        x2 = x1 + dx;
        x3 = x4 - dx;
      }

      if (a == this.connections2.length - 1) {
        x1 = start.offsetLeft + start.scrollWidth / 2 - 900;
        y1 = start.offsetTop + start.clientHeight / 2 - padding+30;
        x4 = end.offsetLeft + start.clientWidth / 2 + 1000;
        y4 = end.offsetTop + start.clientHeight / 2 - padding + 30;

        let data = `M${x1 + 500} ${y1} C ${x2} ${y1} ${x3} ${y4} ${x4} ${y4}`;

        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', data);
        path.setAttribute('class', 'path');
        paths?.appendChild(path);
      } else {
        let data = `M${x1 + 425} ${y1} C ${x2} ${y1} ${x3} ${y4} ${x4} ${y4}`;

        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', data);
        path.setAttribute('class', 'path');
        paths?.appendChild(path);
      }
    }
  }
}
