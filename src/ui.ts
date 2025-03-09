export enum UI {
  /** The container of the displayed days. */
  days = 'days',
  /** Wrapper of the day cell in the days grid. */
  day_cell = 'day_cell',
  /** The day cell in the days grid. */
  day = 'day',
  /** The label of the day cell in the days grid. */
  day_label = 'day_label',
  /** The container of the displayed months. */
  months = 'months',
  /** Wrapper of the month cell in the months grid. */
  month = 'month',
  /** The label of the month cell in the months grid. */
  month_label = 'month_label',
  /** The container of the displayed years. */
  years = 'years',
  /** Wrapper of the year cell in the years grid. */
  year = 'year',
  /** The label of the year cell in the years grid. */
  year_label = 'year_label',
  /** The filled background for the selected range. */
  range_fill = 'range_fill',
  /** The background for the start days of each week within the selected range. */
  range_fill_weekstart = 'range_fill_weekstart',
  /** The background for the end days of each week within the selected range. */
  range_fill_weekend = 'range_fill_weekend',
  /** The calendar header with the previous and next buttons and selectors. */
  header = 'header',
  /** The cell containing the month selector in the header. */
  month_selector = 'month_selector',
  /** The label of the month selector cell in the header. */
  month_selector_label = 'month_selector_label',
  /** The cell containing the year selector in the header. */
  year_selector = 'year_selector',
  /** The label of the year selector cell in the header. */
  year_selector_label = 'year_selector_label',
  /** The cell containing the time selector in the header. */
  time_selector = 'time_selector',
  /** The label of the time selector cell in the header. */
  time_selector_label = 'time_selector_label',
  /** The row grouping the weekdays in the header. */
  weekdays = 'weekdays',
  /** The cell with the weekday in the header. */
  weekday = 'weekday',
  /** The label of the weekday in the header. */
  weekday_label = 'weekday_label',
  /** The next button in the header. */
  button_next = 'button_next',
  /** The previous button in the header. */
  button_prev = 'button_prev',
  /** The next button image in the header. */
  button_next_image = 'button_next_image',
  /** The previous button image in the header. */
  button_prev_image = 'button_prev_image',
  /** The label of the hour and minutes. */
  time_label = 'time_label',
  /** The indicator of the selected hour and minutes. */
  time_selected_indicator = 'time_selected_indicator',
}

export enum SelectionState {
  /** The day is at the end of a selected range. */
  range_end = 'range_end',
  /** The label of the end range cell within a range. */
  range_end_label = 'range_end_label',
  /** The day is at the middle of a selected range. */
  range_middle = 'range_middle',
  /** The label of the middle range cell within a range. */
  range_middle_label = 'range_middle_label',
  /** The day is at the start of a selected range. */
  range_start = 'range_start',
  /** The label of the start range cell within a range. */
  range_start_label = 'range_start_label',
  /** The day is selected. */
  selected = 'selected',
  /** The label of the selected day. */
  selected_label = 'selected_label',
}

export enum CalenderFlag {
  /** The day/month/year is disabled. */
  disabled = 'disabled',
  /** The label of the disabled day/month/year. */
  disabled_label = 'disabled_label',
}

export enum DayFlag {
  /** The day is hidden. */
  hidden = 'hidden',
  /** The day is outside the current month. */
  outside = 'outside',
  /** The label of the outsided day. */
  outside_label = 'outside_label',
  /** The day is today. */
  today = 'today',
  /** The label of the today. */
  today_label = 'today_label',
}

export enum MonthState {
  /** The month is selected. */
  selected_month = 'selected_month',
  /** The label of the selected month. */
  selected_month_label = 'selected_month_label',
}

export enum YearState {
  /** The year is selected. (for single mode) */
  selected_year = 'selected_year',
  /** The label of the selected year. */
  selected_year_label = 'selected_year_label',
  /** The year is activated (not selected). */
  active_year = 'active_year',
  /** The label of the activated year. */
  active_year_label = 'active_year_label',
}
