import moment from 'moment'
import i18n from 'i18next'

export function dateToFromNowDaily (myDate) {
  const fromNow = moment(myDate).format('ddd MMM. DD')
  return moment(myDate).calendar(null, {
    lastWeek: `dddd [${i18n.t('momentConfig:lastWeekText')}]`,
    lastDay: `[${i18n.t('momentConfig:lastDay')}]`,
    sameDay: `[${i18n.t('momentConfig:sameDay')}]`,
    nextDay: `[${i18n.t('momentConfig:nextDay')}]`,
    nextWeek: 'ddd MMM. DD',
    sameElse: () => `[${fromNow}]`
  })
}

export function addLocalize (localize) {
  moment.locale(localize)
  if (localize === 'es') {
    moment.updateLocale(localize,
      {
        weekdays: [
          'Domingo',
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
          'Sabado'
        ],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic']
      }
    )
    return
  }
  moment.updateLocale(localize,
    {
      weekdays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    }
  )
}

export function iconType (categoryName) {
  switch (categoryName) {
    case 'business':
      return 'pack'
    case 'sports':
      return 'badge'
    case 'birthday':
      return 'cake'
    case 'celebration':
      return 'score'
    case 'travel':
      return 'plane'
    case 'other':
      return 'check-circle'
    default:
      return 'check-circle'
  }
}

export function categoryType (name) {
  switch (name) {
    case i18n.t('event:categories.businessText'):
      return 'business'
    case i18n.t('event:categories.sportsText'):
      return 'sports'
    case i18n.t('event:categories.birthdayText'):
      return 'birthday'
    case i18n.t('event:categories.celebrationText'):
      return 'celebration'
    case i18n.t('event:categories.travelText'):
      return 'travel'
    case i18n.t('event:categories.otherText'):
      return 'other'
    default:
      return 'other'
  }
}

export function categoryEdit (name) {
  switch (name) {
    case 'business':
      return i18n.t('event:categories.businessText')
    case 'sports':
      return i18n.t('event:categories.sportsText')
    case 'birthday':
      return i18n.t('event:categories.birthdayText')
    case 'celebration':
      return i18n.t('event:categories.celebrationText')
    case 'travel':
      return i18n.t('event:categories.travelText')
    case 'other':
      return i18n.t('event:categories.otherText')
    default:
      return i18n.t('event:categories.otherText')
  }
}

export const handleHitSlop = space => (
  {
    top: space,
    left: space,
    bottom: space,
    right: space
  }
)

export const extractErrorResponse = e => e.response.data.errors[0].title

export const handleMaxCharacters = max => current =>
  max - current
