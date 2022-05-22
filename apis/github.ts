import { gql } from "@apollo/client"

export const WhoAmI = gql`
  query WhoAmI {
    viewer {
      login
      avatarUrl
    }
  }
`

export const ViewerRepositories = gql`
  query ViewerRepositories($first: Int = 100) {
    viewer {
      repositories(first: $first) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`

export const ViewerRepositoryBranches = gql`
  query ViewerRepositoryBranches($name: String!, $first: Int = 100) {
    viewer {
      repository(name: $name) {
        refs(first: $first, refPrefix: "refs/heads/") {
          edges {
            node {
              name
              id
            }
          }
        }
      }
    }
  }
`

export const ViewerRepositoryFilesTree = gql`
  query ViewerRepositoryFilesTree($repositoryName: String!, $expression: String!) {
    viewer {
      repository(name: $repositoryName) {
        object(expression: $expression) {
          ...SpreedTree
        }
      }
    }
  }

  fragment SpreedTree on Tree {
    entries {
      name
      type
      path
    }
  }
`

export const ViewerRepositoryFilesBlob = gql`
  query ViewerRepositoryFilesBlob($repositoryName: String!, $expression: String!) {
    viewer {
      repository(name: $repositoryName) {
        object(expression: $expression) {
          ... on Blob {
            text
          }
        }
      }
    }
  }
`

export const ViewerRepositoryBrancheFirstCommit = gql`
  query ViewerRepositoryBranches($name: String!, $qualifiedName: String!) {
    viewer {
      repository(name: $name) {
        name
        ref(qualifiedName: $qualifiedName) {
          target {
            ... on Commit {
              message
              id
              oid
            }
          }
        }
      }
    }
  }
`

export const CreateCommitOnBranch = gql`
  mutation CreateCommitOnBranch(
    $branchId: ID!
    $expectedHeadOid: GitObjectID!
    $message: CommitMessage!
    $fileChanges: FileChanges!
  ) {
    createCommitOnBranch(
      input: {
        branch: { id: $branchId }
        expectedHeadOid: $expectedHeadOid
        message: $message
        fileChanges: $fileChanges
      }
    ) {
      commit {
        id
      }
    }
  }
`
