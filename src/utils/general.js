import { PREFIX } from "../constants";

/**
 * Make a new Object or Array based on the item passed
 * 
 * @param {Array | Object} baseObj
 * 
 * @returns {Object|Array}
 */
export const cloneObj = (baseObj) => (
  JSON.parse(JSON.stringify(baseObj))
);


/**
 * Check if 2 objects are equal
 * 
 * @param {Object} obj1
 * @param {object} obj2
 * 
 * @returns {boolean}
 */
export const isEqual = (obj1, obj2) => {
  const strObj1 = JSON.stringify(obj1);
  const strObj2 = JSON.stringify(obj2);

  return strObj1 === strObj2;
}

/**
 * Save data in localStorage or sessionStorage
 * 
 * @param {string} key
 * @param {*} value
 * @param {object} [options]
 * @param {boolean} [options.needParse]
 * @param {boolean} [options.persistData] - If false it will save in sessionStorage
 */
export const saveStorage = (key, value, options = { needParse: false, persistData: true }) => {
  const { needParse, persistData } = options;
  const finalKey = `${PREFIX}${key}`;
  const usedFunc = persistData ? localStorage : sessionStorage;
  const finalValue = needParse ? JSON.stringify(value) : value;

  usedFunc.setItem(finalKey, finalValue);
}

/**
 * Load data from localStorage or sessionStorage
 * 
 * @param {string} key
 * @param {boolean} [needParse] - Set true if you're fetching an Object or Array it 
 * @param {boolean} [persistData] - If 
 * 
 * 
 * @returns {any | undefined} Valor que estava salvo com essa chave
 */
export const loadStorage = (key, needParse = false, dataPersisted = true) => {
  const finalKey = `${PREFIX}${key}`;
  const usedFunc = dataPersisted ? localStorage : sessionStorage;

  const rawValue = usedFunc.getItem(finalKey);

  return needParse ? JSON.parse(rawValue) : rawValue;
}

/**
 * Calculate the order of 2 numbers
 * 
 * @param {number} numberA
 * @param {number} numberB
 * @param {boolean} [shouldRevert] - If true it will revert sort number result
 * 
 * @returns {number} One of the following: -1, 0 ou 1. It's the position of numberA over numberB
 */
export const calculaOrdem = (numberA, numberB, shouldRevert = false) => {
  const diff = numberA - numberB;
  const multiplier = shouldRevert ? -1 : 1;

  return !diff ? 0 : diff / Math.abs(diff) * multiplier;
}

/**
 * Create a sorted Array from object
 * 
 * @param {Array<Object>} list
 * @param {object} [options] 
 * @param {string} [options.sortKey] - Key name used as parameter to check the order
 * @param {boolean} [options.revertOrder] - If it should revert the sort result
 * 
 * @returns {Array<object>} Lista de objetos ordenados
 */
export const sortElements = (list, options = { sortKey: "order", revertOrder: false }) => {
  const { sortKey, revertOrder } = options;

  return list.toSorted((itemA, itemB) => {
    return calculaOrdem(itemA[sortKey], itemB[sortKey], revertOrder);
  })
}

/**
 * Change string to add prefix
 * 
 * @param {string} text
 * 
 * @returns {string} New text with prefix
 */
export const withPrefix = (text) => (`${PREFIX}${text}`)
