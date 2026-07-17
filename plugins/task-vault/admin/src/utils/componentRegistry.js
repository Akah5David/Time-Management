/**
 * Registry Structure
 *
 * {
 *   HomePage: {
 *     top: [],
 *     middle: [],
 *     bottom: []
 *   }
 * }
 */

const registry = {};

/**
 * Ensure a view exists.
 */

function ensureView(view) {
  //checks if a view key exists in the registry object if it does not exist create the view key and assign it object as a value
  if (!registry[view]) {
    registry[view] = {};
  }
}

/**
 * Ensure a zone exists inside a view.
 */
function ensureZone(view, zone) {
  ensureView(view);

  //checks if view has an existing zone in the registry object if it does not exist create that zone as a key of view and assign it an array as a value
  if (!registry[view][zone]) {
    registry[view][zone] = [];
  }
}

/**
 * Register a component into an injection zone.
 *
 * @param {string} view
 * @param {string} zone
 * @param {object} component
 */
export function injectComponent(view, zone, component) {
  ensureZone(view, zone);

  registry[view][zone].push(component);

  console.log(registry);

}

/**
 * Return all components registered
 * for a particular view and zone.
 *
 * @param {string} view
 * @param {string} zone
 *
 * @returns {Array}
 */
export function getInjectedComponents(view, zone) {
  return registry?.[view]?.[zone] ?? [];
}


//Helper Functions
export function printRegistry() {
  console.log(registry);
}

export function clearRegistry() {
  Object.keys(registry).forEach((key) => delete registry[key]);
}

export function hasZone(view, zone) {
  return !!registry?.[view]?.[zone];
}