import { useState, useEffect, useCallback } from 'react';
import ArticleService from '../../services/articleService/articleService';
import ArticleReactionService from '../../services/articleReactionService/articleReactionService';
import { getOrCreateVoterIdentifier } from "@/Utilities/voterIdentifierHelper"


export const useArticleReaction = (articleId, initialLikeCount, initialDislikeCount) => {
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);
    const [userReaction, setUserReaction] = useState(null); // null, 'liked', 'disliked'
    const voterIdentifier = getOrCreateVoterIdentifier();
    const articleReactionService = new ArticleReactionService();

  
    const checkUserReaction = useCallback(async () => {
        const reaction = await articleReactionService.getReactionByArticleAndVoter(articleId, voterIdentifier);
        if (reaction) {
            setUserReaction(reaction.isLiked ? 'liked' : 'disliked');
        }
    }, [articleId, voterIdentifier, articleReactionService]);

    const handleLike = async () => {
        try {
            const existingReaction = await articleReactionService.getReactionByArticleAndVoter(articleId, voterIdentifier);
            if (existingReaction) {
                if (existingReaction.isLiked) {
                    await articleReactionService.deleteReaction(articleId, voterIdentifier);
                    setLikeCount(prev => prev - 1);
                    setUserReaction(null);
                } else {
                    await articleReactionService.updateReaction(articleId, voterIdentifier, true);
                    setLikeCount(prev => prev + 1);
                    setDislikeCount(prev => prev - 1);
                    setUserReaction('liked');
                }
            } else {
                await articleReactionService.addReaction(articleId, voterIdentifier, true);
                setLikeCount(prev => prev + 1);
                setUserReaction('liked');
            }
        } catch (error) {
            console.error('Error handling like:', error);
        }
    };

    const handleDislike = async () => {
        try {
            const existingReaction = await articleReactionService.getReactionByArticleAndVoter(articleId, voterIdentifier);
            if (existingReaction) {
                if (!existingReaction.isLiked) {
                    await articleReactionService.deleteReaction(articleId, voterIdentifier);
                    setDislikeCount(prev => prev - 1);
                    setUserReaction(null);
                } else {
                    await articleReactionService.updateReaction(articleId, voterIdentifier, false);
                    setDislikeCount(prev => prev + 1);
                    setLikeCount(prev => prev - 1);
                    setUserReaction('disliked');
                }
            } else {
                await articleReactionService.addReaction(articleId, voterIdentifier, false);
                setDislikeCount(prev => prev + 1);
                setUserReaction('disliked');
            }
        } catch (error) {
            console.error('Error handling dislike:', error);
        }
    };

  
    return { likeCount, dislikeCount, handleLike, handleDislike, userReaction, checkUserReaction };
};

export default useArticleReaction;

