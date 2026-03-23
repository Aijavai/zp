import { Controller, Get, Query, Sse } from '@nestjs/common';
import { AiService } from './ai.service';
import { 
  from,
  Observable
} from 'rxjs';
import {
  map
} from 'rxjs/operators';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // @Get('chat')
  // async chat(@Query('query') query:string){
  //   const answer = await this.aiService.runChain(query);
  //   return {answer};
  // }

  // 装饰器模式 
  // Server-Sent Events 流式响应
  // Content-Type: text/event-stream
  // Cache-Control: no-cache 别缓存
  // Connection: keep-alive 保持连接
  // Transfer-Encoding: chunked 分块传输
  @Sse('chat/stream')
  chatStream(@Query('query') query:string): Observable<MessageEvent> {
    const stream = this.aiService.runChainStream(query);
    // from 将llm stream 转换为observable 对象
    return from(stream)
      .pipe(
        map((chunk) => ({
          // 前端需要的chunk 的格式约定
          data: chunk,
          
        }))
      ) as Observable<MessageEvent>;
  }
}
