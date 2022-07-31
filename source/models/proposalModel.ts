import { model } from 'mongoose';
import { IProposalDocument } from '../interfaces/proposal';
import proposalSchema from '../schemas/proposalSchema';

export default model<IProposalDocument>('Proposal', proposalSchema);
