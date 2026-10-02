/*
 * @copyright (c) 2026-present, Philipp Thürwächter, Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

/**
 * Selects the steps to run.
 *
 * @param {{name: string, run: Function}[]} steps - all steps, in pipeline order
 * @param {{step?: string, from?: string}} options - `step` runs one step, `from` resumes from a step
 * @return {{name: string, run: Function}[]}
 */
export function selectSteps(steps, { step, from } = {}) {
    if (step != null && from != null) {
        throw new Error('Use either --step or --from, not both');
    }
    const name = step != null ? step : from;
    if (name == null) {
        return steps.slice();
    }
    const index = steps.findIndex((s) => s.name === name);
    if (index < 0) {
        throw new Error(`Unknown step '${name}', expected one of: ${steps.map((s) => s.name).join(', ')}`);
    }
    return step != null ? [steps[index]] : steps.slice(index);
}

/**
 * Runs the selected steps in order, passing the context from one step to the next.
 *
 * @param {{name: string, run: Function}[]} steps
 * @param {{step?: string, from?: string}} options
 * @param {object} ctx
 * @param {(message: string) => void} [log]
 * @return {Promise<object>} the context returned by the last step
 */
export async function runPipeline(steps, options, ctx, log = () => {}) {
    let current = ctx;
    for (const step of selectSteps(steps, options)) {
        log(`--- ${step.name}`);
        current = (await step.run(current)) || current;
    }
    return current;
}
