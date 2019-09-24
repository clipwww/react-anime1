import ReactGA from 'react-ga'

const onHashChange = () => {
  const page = window.location.hash.replace('#', '');
  console.log(page)
  ReactGA.set({ page })
  ReactGA.pageview(page)
}

export const initGA = () => {
  console.log('initGA')
  ReactGA.initialize('UA-93335284-3');
  onHashChange();
  window.addEventListener('hashchange', onHashChange)
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}