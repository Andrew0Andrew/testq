class Record {
    constructor(title, description, done = false) {
      this.title = title;
      this.description = description;
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.done = done;
    }
  
    toJSON() {
      return JSON.stringify({
        title: this.title,
        description: this.description,
        createdAt: this.createdAt.toISOString(),
        updatedAt: this.updatedAt.toISOString(),
        done: this.done,
      });
    }
  
    static fromJSON(jsonData) {
      const data = JSON.parse(jsonData);
      return new Record(data.title, data.description, data.done);
    }
  }
  
  class RecordManager {
    constructor() {
      this.storageKey = 'records';
      this.loadRecords();
    }
  
    loadRecords() {
      try {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
          this.records = data.split('\n').map(recordJSON => Record.fromJSON(recordJSON));
        } else {
          this.records = [];
        }
      } catch (e) {
        this.records = [];
      }
    }
  
    saveRecords() {
      localStorage.setItem(this.storageKey, this.records.map(record => record.toJSON()).join('\n'));
    }
  
    addRecord(title, description) {
      const newRecord = new Record(title, description);
      this.records.push(newRecord);
      this.saveRecords();
    }
  
    getAllRecords() {
      return this.records;
    }
  
    getRecordById(recordId) {
      if (recordId < 0  recordId >= this.records.length) {
        return null;
      }
  
      return this.records[recordId];
    }
  
    updateRecord(recordId, title, description, done) {
      if (recordId < 0  recordId >= this.records.length) {
        return;
      }
  
      const record = this.records[recordId];
      record.title = title;
      record.description = description;
      record.done = done;
      record.updatedAt = new Date();
      this.saveRecords();
    }
  
    deleteRecord(recordId) {
      if (recordId < 0 || recordId >= this.records.length) {
        return;
      }
  
      this.records.splice(recordId, 1);
      this.saveRecords();
    }
  }