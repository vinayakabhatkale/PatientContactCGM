﻿import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

import { ModalService } from './modal.service';

@Component({
  selector: 'app-model',
  template: '<ng-content></ng-content>'
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: JQuery;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = $(el.nativeElement);
  }

  ngOnInit(): void {
    const modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    this.element.appendTo('body');

    // close modal on background click
    /*this.element.on('click', function (e: any) {
        var target = $(e.target);
        if (!target.closest('.modal-body').length) {
            modal.close();
        }
    });*/

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.show();
    this.element.addClass('fade show');
    $('body').addClass('modal-open');
  }

  // close modal
  close(): void {
    this.element.hide();
    this.element.addClass('fade hide');
    $('body').removeClass('modal-open');
  }
}
