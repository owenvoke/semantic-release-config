/** @type {import('semantic-release').GlobalConfig} */
export default {
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                'preset': 'angular',
                'releaseRules': [
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
                                'section': 'Other',
                                'hidden': false,
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
                        ],
                },
            },
        ],
        'semantic-release-export-data',
    ],
}
