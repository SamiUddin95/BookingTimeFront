export interface ReviewRequest {
    propertyId: number,
    paginationInfo: {
        page?: number,
        rowsPerPage?: number
    }
}

export interface AddReviewRequest {
    propertyId: number,
    userId: number,
    ratingId: number,
    review: string
}