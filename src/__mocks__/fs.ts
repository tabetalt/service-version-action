const mockServices = `
[
  {
    "type": "grpc",
    "name": "tenant",
    "roles": ["roles/firebase.developAdmin"],
    "version": "latest"
  },
  {
    "type": "abc",
    "name": "tre",
    "roles": ["roles/firebase.developAdmin"],
    "version": "latest"
  }
]
`;

export function readFileSync() {
  return mockServices;
}

export function writeFileSync() {
  return true;
}