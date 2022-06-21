import { NextPage, GetStaticPaths } from "next";
import { getAllPostIds } from "../../lib/posts";


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

const PostPage: NextPage = () => {
    return (
        <div>this is post detail page.</div>
    );
}


export default PostPage;
