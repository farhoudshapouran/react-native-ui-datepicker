import { ClassNames, Styles } from './types';
import { UI, SelectionState, DayFlag, MonthState, YearState } from './ui';

export function getDefaultClassNames(): ClassNames {
  const classNames: ClassNames = {
    [UI.days]: '',
    [UI.day_wrapper]: 'p-0.5',
    [UI.day]: 'group rounded-md web:hover:bg-accent',
    [UI.day_label]: 'web:whitespace-nowrap text-foreground font-normal',
    [UI.months]: '',
    [UI.month]: 'group rounded-md web:hover:bg-accent active:bg-accent',
    [UI.month_label]:
      'web:whitespace-nowrap text-foreground group-active:text-accent-foreground font-normal',
    [UI.years]: '',
    [UI.year]: 'group rounded-md web:hover:bg-accent active:bg-accent',
    [UI.year_label]:
      'web:whitespace-nowrap text-foreground group-active:text-accent-foreground font-normal',
    [UI.range_line]: 'bg-accent',
    [UI.range_line_weekstart]: '',
    [UI.range_line_weekend]: '',
    [UI.header]: 'mb-1',
    [UI.month_selector]: '',
    [UI.month_selector_label]: 'font-semibold text-xl',
    [UI.year_selector]: '',
    [UI.year_selector_label]: 'font-semibold text-xl',
    [UI.time_selector]: '',
    [UI.time_selector_label]: 'font-semibold text-xl',
    [UI.weekdays]: '',
    [UI.weekday]: '',
    [UI.weekday_label]: 'text-sm uppercase',
    [UI.button_next]: '',
    [UI.button_prev]: '',
    [UI.time_label]: 'text-foreground text-2xl font-medium',
    [UI.time_selected_indicator]: 'bg-muted rounded-lg',

    [SelectionState.range_end]: '',
    [SelectionState.range_end_label]: 'text-primary-foreground',
    [SelectionState.range_middle]: 'bg-transparent',
    [SelectionState.range_middle_label]: 'text-accent-foreground',
    [SelectionState.range_start]: '',
    [SelectionState.range_start_label]: 'text-primary-foreground',
    [SelectionState.selected]:
      'group rounded-md bg-primary web:hover:bg-primary web:hover:opacity-90 active:opacity-90',
    [SelectionState.selected_label]: 'text-primary-foreground',

    [DayFlag.disabled]: '',
    [DayFlag.disabled_label]: 'text-muted-foreground opacity-50',
    [DayFlag.hidden]: '',
    [DayFlag.outside]: '',
    [DayFlag.outside_label]: 'text-muted-foreground',
    [DayFlag.today]: 'bg-accent',
    [DayFlag.today_label]: 'text-accent-foreground',

    [MonthState.selected_month]:
      'group rounded-md bg-primary web:hover:opacity-90 active:opacity-90',
    [MonthState.selected_month_label]: 'text-primary-foreground',

    [YearState.selected_year]:
      'group rounded-md bg-primary web:hover:opacity-90 active:opacity-90',
    [YearState.selected_year_label]: 'text-primary-foreground',
    [YearState.active_year]: 'bg-accent',
    [YearState.active_year_label]: 'text-accent-foreground',
  };

  return classNames;
}

export function getDefaultStyles(scheme: 'light' | 'dark'): Styles {
  const styles: Styles = {
    [UI.days]: {},
    [UI.day_wrapper]: { padding: 1.5 },
    [UI.day]: { borderRadius: 5 },
    [UI.day_label]: { color: COLORS[scheme].accentForeground },
    [UI.months]: {},
    [UI.month]: {
      borderColor: COLORS[scheme].border,
      borderWidth: 1,
      borderRadius: 5,
    },
    [UI.month_label]: { color: COLORS[scheme].accentForeground },
    [UI.years]: {},
    [UI.year]: {
      borderColor: COLORS[scheme].border,
      borderWidth: 1,
      borderRadius: 5,
    },
    [UI.year_label]: { color: COLORS[scheme].accentForeground },
    [UI.range_line]: { backgroundColor: COLORS[scheme].accent },
    [UI.range_line_weekstart]: {},
    [UI.range_line_weekend]: {},
    [UI.header]: { marginBottom: 5 },
    [UI.month_selector]: {},
    [UI.month_selector_label]: { fontSize: 18, fontWeight: '500' },
    [UI.year_selector]: {},
    [UI.year_selector_label]: { fontSize: 18, fontWeight: '500' },
    [UI.time_selector]: {},
    [UI.time_selector_label]: { fontSize: 18, fontWeight: '500' },
    [UI.weekdays]: {},
    [UI.weekday]: {},
    [UI.weekday_label]: { textTransform: 'uppercase' },
    [UI.button_next]: {},
    [UI.button_prev]: {},
    [UI.time_label]: { fontSize: 22, fontWeight: '500' },
    [UI.time_selected_indicator]: {
      backgroundColor: 'hsl(240 4.8% 95.9%)',
      borderRadius: 5,
    },

    [SelectionState.range_end]: {},
    [SelectionState.range_end_label]: {
      color: COLORS[scheme].primaryForeground,
    },
    [SelectionState.range_middle]: { backgroundColor: 'transparent' },
    [SelectionState.range_middle_label]: {
      color: COLORS[scheme].accentForeground,
    },
    [SelectionState.range_start]: {},
    [SelectionState.range_start_label]: {
      color: COLORS[scheme].primaryForeground,
    },
    [SelectionState.selected]: {
      borderRadius: 5,
      backgroundColor: COLORS[scheme].primary,
    },
    [SelectionState.selected_label]: {
      color: COLORS[scheme].primaryForeground,
    },

    [DayFlag.disabled]: {},
    [DayFlag.disabled_label]: {
      color: COLORS[scheme].mutedForeground,
      opacity: 0.5,
    },
    [DayFlag.hidden]: {},
    [DayFlag.outside]: {},
    [DayFlag.outside_label]: { color: COLORS[scheme].mutedForeground },
    [DayFlag.today]: { backgroundColor: COLORS[scheme].accent },
    [DayFlag.today_label]: { color: COLORS[scheme].accentForeground },

    [MonthState.selected_month]: {
      backgroundColor: COLORS[scheme].primary,
      borderColor: COLORS[scheme].primary,
    },
    [MonthState.selected_month_label]: {
      color: COLORS[scheme].primaryForeground,
    },

    [YearState.selected_year]: {
      backgroundColor: COLORS[scheme].primary,
      borderColor: COLORS[scheme].primary,
    },
    [YearState.selected_year_label]: {
      color: COLORS[scheme].primaryForeground,
    },
    [YearState.active_year]: {
      backgroundColor: COLORS[scheme].accent,
      borderColor: COLORS[scheme].accent,
    },
    [YearState.active_year_label]: {
      color: COLORS[scheme].accentForeground,
    },
  };

  return styles;
}

const COLORS = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(240 10% 3.9%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(240 10% 3.9%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(240 10% 3.9%)',
    primary: 'hsl(240 5.9% 10%)',
    primaryForeground: 'hsl(0 0% 98%)',
    secondary: 'hsl(240 4.8% 95.9%)',
    secondaryForeground: 'hsl(240 5.9% 10%)',
    muted: 'hsl(240 4.8% 95.9%)',
    mutedForeground: 'hsl(240 3.8% 46.1%)',
    accent: 'hsl(240 4.8% 95.9%)',
    accentForeground: 'hsl(240 5.9% 10%)',
    destructive: 'hsl(0 84.2% 60.2%)',
    destructiveForeground: 'hsl(0 0% 98%)',
    border: 'hsl(240 5.9% 90%)',
  },
  dark: {
    background: 'hsl(240 10% 3.9%)',
    foreground: 'hsl(0 0% 98%)',
    card: 'hsl(240 10% 3.9%)',
    cardForeground: 'hsl(0 0% 98%)',
    popover: 'hsl(240 10% 3.9%)',
    popoverForeground: 'hsl(0 0% 98%)',
    primary: 'hsl(0 0% 98%)',
    primaryForeground: 'hsl(240 5.9% 10%)',
    secondary: 'hsl(240 3.7% 15.9%)',
    secondaryForeground: 'hsl(0 0% 98%)',
    muted: 'hsl(240 3.7% 15.9%)',
    mutedForeground: 'hsl(240 5% 64.9%)',
    accent: 'hsl(240 3.7% 15.9%)',
    accentForeground: 'hsl(0 0% 98%)',
    destructive: 'hsl(0 62.8% 30.6%)',
    destructiveForeground: 'hsl(0 0% 98%)',
    border: 'hsl(240 3.7% 15.9%)',
  },
};
