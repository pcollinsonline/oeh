import { useQuery, UseQueryResult } from 'react-query';
import { shuffle } from '../components/game/utils/game-utils';

const WORD_LIST = shuffle([
  'amphictyons',
  'nebulizers',
  'stickwork',
  'prejudicially',
  'heatwave',
  'rubes',
  'Mayflower',
  'squaddies',
  'Walesa',
  'TAYONG',
  'youngsters',
  'unintelligible',
  'hiren',
  'Adgarley',
  'newfangledness',
  'internalism',
  'twatfaced',
  'underside',
  'steadying',
  'dodecahedra',
  'unbrewed',
  'pantsed',
  'abolitionist',
  'fadlike',
  'pilotry',
  'digression',
  'spriggy',
  'hinger',
  'cajolery',
  'fizziest',
  'choak',
  'reships',
  'shoring',
  'dissociator',
  'vamped',
  'kamancheh',
  'vernissage',
  'Adangme',
  'phytosaur',
  'engaoled',
  'explicitness',
  'defeminise',
  'illations',
  'baritone',
  'lavenders',
  'refixed',
  'crusado',
  'chickens',
  'marsupial',
  'cerebral',
]);

const API_CALL = process.env.REACT_APP_WORD_LIST_API || '/api/word-list';

const fetchWordList = async (): Promise<string[]> => {
  try {
    const wordListResponse = await fetch(API_CALL);

    if (!wordListResponse.ok) {
      // throw new Error(`ErrorMessage.Wordlist.${wordListResponse.status}`);
      return WORD_LIST;
    }

    return (await wordListResponse.json()) as string[];
  } catch (error) {
    return WORD_LIST;
  }
};

const useWordPool = (): UseQueryResult<string[], Error> => {
  return useQuery<string[], Error>(['wordPool'], () => fetchWordList(), {
    retry: 0,
    refetchOnWindowFocus: false,
  });
};

export { useWordPool, WORD_LIST };
