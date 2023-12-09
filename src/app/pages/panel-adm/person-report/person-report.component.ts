import {Component, OnInit, ViewChild} from '@angular/core';
import {PessoaService} from "../../../services/pessoa.service";
import {Pessoa} from "../../../entities/Pessoa";
import {Subscription} from "rxjs";
import {Table} from "primeng/table";
import {PessoaSubscriptionModel} from "./PessoaSubscriptionModel";

@Component({
  selector: 'app-person-report',
  templateUrl: './person-report.component.html',
  styleUrls: ['./person-report.component.scss']
})
export class PersonReportComponent implements OnInit {
  @ViewChild('dt') table!: Table;
  persons: PessoaSubscriptionModel[] = [];
  persons$?: Subscription;

  constructor(private pessoaService: PessoaService) {
  }

  ngOnInit(): void {
    this.persons$ = this.pessoaService.getPessoaReport()
      .subscribe((response: PessoaSubscriptionModel[]): void => {
        console.log(response);
        this.persons = response;
      });
  }

  clear(): void {
    this.table.clear();
  }

  convertToDate(dateString: string): Date {
    return new Date(dateString);
  }

}
