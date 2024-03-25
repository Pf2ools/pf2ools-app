import Peggy from 'peggy';
import rollgrammar from './roll-grammar.peggy?raw';

export const parser = Peggy.generate(rollgrammar);
