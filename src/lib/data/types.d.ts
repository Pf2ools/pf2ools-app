import {
	background as backgroundSchema,
	condition as conditionSchema,
	divineIntercession as divineIntercessionSchema,
	domain as domainSchema,
	event as eventSchema,
	relicGift as relicGiftSchema,
	skill as skillSchema,
	source as sourceSchema,
} from 'pf2ools-schema';
import type { z } from 'zod';

import BackgroundClass from './classes/backgroundClass';
import SourceClass from './classes/sourceClass';
import ConditionClass from './classes/conditionClass';
import DivineIntercessionClass from './classes/divineIntercessionClass';
import EventClass from './classes/eventClass';
import RelicGiftClass from './classes/relicGiftClass';
import SkillClass from './classes/skillClass';
import DomainClass from './classes/domainClass';
import HomebrewSourceClass from './classes/homebrewSourceClass';

export interface dataTypes {
	background: z.infer<typeof backgroundSchema>;
	source: z.infer<typeof sourceSchema>;
	condition: z.infer<typeof conditionSchema>;
	divineIntercession: z.infer<typeof divineIntercessionSchema>;
	event: z.infer<typeof eventSchema>;
	relicGift: z.infer<typeof relicGiftSchema>;
	skill: z.infer<typeof skillSchema>;
	domain: z.infer<typeof domainSchema>;
}

export interface classTypes {
	background: BackgroundClass;
	source: SourceClass;
	condition: ConditionClass;
	divineIntercession: DivineIntercessionClass;
	event: EventClass;
	relicGift: RelicGiftClass;
	skill: SkillClass;
	domain: DomainClass;
	homebrewSources: HomebrewSourceClass;
}

export interface classConstructorTypes {
	background: typeof BackgroundClass;
	source: typeof SourceClass;
	condition: typeof ConditionClass;
	divineIntercession: typeof DivineIntercessionClass;
	event: typeof EventClass;
	relicGift: typeof RelicGiftClass;
	skill: typeof SkillClass;
	domain: typeof DomainClass;
	homebrewSources: typeof HomebrewSourceClass;
}
