import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  standalone: true,
  imports: [FormsModule]
})
export class SearchBarComponent {
  @Input() placeholder = "Search recipes...";
  @Output() valueChange = new EventEmitter<string>();
  value = '';

  onInput(val: string | Event) {
    if (typeof val === 'string') {
      this.value = val;
      this.valueChange.emit(val);
    } else if (val && typeof val === 'object' && 'target' in val) {
      // fallback for event
      this.value = (val.target as HTMLInputElement)?.value || '';
      this.valueChange.emit(this.value);
    }
  }
}
