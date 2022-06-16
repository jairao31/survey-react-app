export default class Question {
  static TYPES = Object.freeze({
    Likert: "Likert",
    Inventory: "Inventory",
    Multiple: "Multiple",
  });

  static DEFAULTS = Object.freeze({
    text: "New Question",
    type: Question.TYPES.Likert,
    options: [],
  });

  constructor(params = {}) {
    const { text, type, options, id } = { ...Question.DEFAULTS, ...params };
    this.text = text;
    this.type = type;
    this.options = options;
    this.id = id || Math.random();
  }

  get hasOptions() {
    return true;
  }

  get inputType() {
    if (
      this.type === Question.TYPES.Likert ||
      this.type === Question.TYPES.Inventory
    )
      return "checkbox";
    if (this.type === Question.TYPES.Multiple) return "checkbox";
    throw new Error("This question does not have an input type.");
  }

  merge(patch) {
    return new Question({ ...this, ...patch });
  }
}
