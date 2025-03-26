import { Candidate } from '../../domain/models/Candidate';

export const getCandidatesByPositionId = async (positionId: number) => {
    const candidates = await Candidate.findManyByPositionId(positionId);
    return candidates.map(candidate => ({
        fullName: `${candidate.firstName} ${candidate.lastName}`,
        currentInterviewStep: candidate.applications[0].currentInterviewStep,
        score: candidate.applications[0].interviews[0]?.score || null,
    }));
}; 