import { analyzeCommits } from '@semantic-release/commit-analyzer'

/**
 * Wraps the commit analyser so that breaking changes on a `0.x` release
 * trigger a minor release instead of a major release (e.g. `0.3.1` -> `0.4.0`).
 * Moving to `1.0.0` must be done by manually tagging the release.
 */
const commitAnalyzer = {
    async analyzeCommits(pluginConfig, context) {
        const releaseType = await analyzeCommits(pluginConfig, context)

        if (releaseType === 'major' && context.lastRelease?.version?.startsWith('0.')) {
            context.logger.log('Last release is %s, downgrading major release to minor', context.lastRelease.version)

            return 'minor'
        }

        return releaseType
    },
}

/** @type {import('semantic-release').GlobalConfig} */
export default {
    plugins: [
        [
            commitAnalyzer,
            {
                'preset': 'conventionalcommits',
                'releaseRules': [
                    {
                        'breaking': true,
                        'release': 'major',
                    },
                    {
                        'type': 'chore',
                        'scope': 'deps',
                        'release': false,
                    },
                    {
                        'type': 'chore',
                        'scope': 'deps-dev',
                        'release': false,
                    },
                    {
                        'type': 'chore',
                        'scope': null,
                        'release': 'patch',
                    },
                    {
                        'type': 'chore',
                        'scope': '!(deps|deps-dev)',
                        'release': 'patch',
                    },
                    {
                        'type': 'refactor',
                        'release': 'patch',
                    },
                    {
                        'type': 'style',
                        'release': 'patch',
                    },
                ],
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                'preset': 'conventionalcommits',
                'presetConfig': {
                    'types':
                        [
                            {
                                'type': 'build',
                                'section': 'CI/CD',
                                'hidden': true,
                            },
                            {
                                'type': 'chore',
                                'scope': 'deps',
                                'hidden': true,
                            },
                            {
                                'type': 'chore',
                                'scope': 'deps-dev',
                                'hidden': true,
                            },
                            {
                                'type': 'chore',
                                'section': 'Other',
                                'hidden': false,
                            },
                            {
                                'type': 'ci',
                                'section': 'CI/CD',
                                'hidden': true,
                            },
                            {
                                'type': 'docs',
                                'section': 'Docs',
                                'hidden': true,
                            },
                            {
                                'type': 'feat',
                                'section': 'Features',
                                'hidden': false,
                            },
                            {
                                'type': 'fix',
                                'section': 'Fixes',
                                'hidden': false,
                            },
                            {
                                'type': 'perf',
                                'section': 'Performance',
                            },
                            {
                                'type': 'refactor',
                                'section': 'Refactor',
                                'hidden': false,
                            },
                            {
                                'type': 'revert',
                                'section': 'Reverts',
                            },
                            {
                                'type': 'style',
                                'section': 'Style',
                                'hidden': true,
                            },
                            {
                                'type': 'test',
                                'section': 'Tests',
                                'hidden': true,
                            },
                            {
                                'type': 'tests',
                                'section': 'Tests',
                                'hidden': true,
                            },
                        ],
                },
            },
        ],
        'semantic-release-export-data',
    ],
}
