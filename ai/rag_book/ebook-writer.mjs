import "dotenv/config";
import { parse } from 'path';
import {
    MilvusClient,
    DataType,
    MetricType,
    IndexType,
} from '@zilliz/milvus2-sdk-node'
import {
    OpenAIEmbeddings
} from '@langchain/openai'
import {
    EPubLoader
} from '@langchain/community/document_loaders/fs/epub'
import {
    RecursiveCharacterTextSplitter
} from '@langchain/textsplitters'

const COLLECTION_NAME = 'ebook';
const VECTION_DIM = 1024;