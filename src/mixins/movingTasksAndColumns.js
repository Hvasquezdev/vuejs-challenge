export default {
  props: {
    board: {
      type: Object,
      required: true
    }
  },

  methods: {
    moveTaskOrColumn(e, toColumn, toTask = null) {
      const type = e.dataTransfer.getData('type');

      switch (type) {
        case 'task':
          this.moveTask(e, toColumn, toTask);
          break;

        default:
          this.moveColumn(e, toColumn);
          break;
      }
    },
    moveTask(e, toColumn, toTask) {
      const fromIndex = e.dataTransfer.getData('from-column-index');
      const taskIndex = e.dataTransfer.getData('task-index');
      const column = this.board.columns.find(
        column => column.id === toColumn.id
      );
      const toColumnIndex = this.board.columns.indexOf(column);
      const toTaskIndex = column.tasks.indexOf(toTask);

      this.$store.commit('MOVE_TASK', {
        from: fromIndex,
        to: toColumnIndex,
        taskIndex,
        toTaskIndex
      });
    },
    moveColumn(e, to) {
      const fromIndex = e.dataTransfer.getData('from-column-index');
      const toIndex = this.board.columns.indexOf(to);

      this.$store.commit('MOVE_COLUMN', {
        fromIndex,
        toIndex
      });
    }
  }
};
