import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getAllPostIds, getPostById, Post, } from "../../lib/posts";


type PathParams = {
    // post's id
    id: string;
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false,
    }
}

type PostPageProps = {
    post: Post;
};

export const getStaticProps: GetStaticProps<PostPageProps> = async context => {
    const { id } = context.params as PathParams;
    const post = await getPostById(id);

    return {
        props: {
            post
        }
    }
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
    return (
        <div>
            <h1>this is post detail page.</h1>
            <div>{post.title}</div>
        </div>
    );
}


export default PostPage;
