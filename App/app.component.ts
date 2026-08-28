import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Member {
  id: number;
  name: string;
  age: number;
  department: string;
  available: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Departments
  departments = ['Development', 'Marketing', 'Design'];

  // Members state
  members = signal<Member[]>([
    { id: 1, name: 'Alice', age: 28, department: 'Development', available: true },
    { id: 2, name: 'Bob', age: 34, department: 'Marketing', available: false },
    { id: 3, name: 'Charlie', age: 25, department: 'Design', available: true },
  ]);
  private nextId = 4;

  // Filter and view
  filterDepartment = signal<string>('All');
  viewMode = signal<'card' | 'list'>('card');

  // New member form model
  newMember = {
    name: '',
    age: null as number | null,
    department: this.departments[0],
    available: true
  };

  // Computed filtered members
  filteredMembers = computed(() => {
    const filter = this.filterDepartment();
    const all = this.members();
    if (filter === 'All') return all;
    return all.filter(m => m.department === filter);
  });

  // Add member
  addMember() {
    const { name, age, department, available } = this.newMember;
    if (!name || age === null || age < 18) {
      alert('Please provide a valid name and age (min 18).');
      return;
    }
    this.members.update(list => [
      ...list,
      { id: this.nextId++, name, age, department, available }
    ]);
    // Reset form
    this.newMember = { name: '', age: null, department: this.departments[0], available: true };
  }

  // Toggle availability
  toggleAvailability(id: number) {
    this.members.update(list =>
      list.map(m => m.id === id ? { ...m, available: !m.available } : m)
    );
  }

  // Remove member (optional bonus)
  removeMember(id: number) {
    this.members.update(list => list.filter(m => m.id !== id));
  }
}