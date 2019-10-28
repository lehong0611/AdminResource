export class Order {
    id: number
    code: string
    sendername: string
    senderphone: string
    senderaddress: string
    recievername: string
    recieverphone: string
    recieveraddress: string
    weigh: string
    kind: string
    service: string
    note: string
    createdUserId: number
    // createdUserName: string
    // customerPhone: string
    guestName: string
    guestPhone: string
    guestAddress: string
    createdTime: string
    acceptUserId: number
    shipperTaken: number
    addressTaken: string
    shipperTransfer: number
    status: string
    estimateTime: string
    reasonReject: string
    total: number
    reassignAgencyId: number
}
